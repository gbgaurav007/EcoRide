import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt, { decode } from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, contact, email, password } = req.body;

    if (
      [name, contact, email, password].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists.");
    }

    const user = await User.create({
      name,
      contact,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }
    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered Sucessfully"));
  } catch (error) {
    console.error("Error registering user:", error);
    throw new ApiError(401, error?.message || "Problem Registering User");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, {}, "User does not exist"));
    // throw new ApiError(404, "user does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    // throw new ApiError(401, "Invalid user credentials");
    return res
      .status(401)
      .json(new ApiResponse(401, {}, "Invalid user credentials"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

const verifyDriver = asyncHandler(async (req, res) => {
  const { carName, carNumber } = req.body;

  const livePhotoPath = req.files["livePhoto"]
    ? req.files["livePhoto"][0].path
    : null;

  if (!carNumber || !carName || !livePhotoPath) {
    throw new ApiError(400, "All verification fields are required");
  }

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const livePhotoUrl = await uploadOnCloudinary(livePhotoPath);

  if (!livePhotoUrl) {
    throw new ApiError(500, "Failed to upload live photo");
  }

  if (user.isDriver) {
    throw new ApiError(400, "User is already a verified driver");
  }

  user.driverVerification = {
    carNumber: carNumber,
    carName: carName,
    livePhoto: livePhotoUrl.url,
    verified: true,
  };

  user.isDriver = true;

  await user.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "Driver verified successfully"));
});

const getDriverVerificationStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "isDriver driverVerification"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "Driver verification status fetched successfully"
      )
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  verifyDriver,
  getDriverVerificationStatus,
};
