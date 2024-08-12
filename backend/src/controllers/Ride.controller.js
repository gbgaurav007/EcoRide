import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Ride } from "../models/ride.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const publishRide = asyncHandler(async (req, res) => {

  const {
    driverCarName,
    driverCarNumber,
    leavingFrom,
    goingTo,
    date,
    time,
    NumberOfpassengers,
    price,
  } = req.body;

  if (
    !leavingFrom ||
    !goingTo ||
    !date ||
    !time ||
    !NumberOfpassengers ||
    !price
  ) {
    throw new ApiError(400, "All ride fields are required");
  }

  const user = await User.findById(req.user._id);

  if (!user || !user.isDriver) {
    throw new ApiError(403, "Only verified drivers can publish rides");
  }


  const newRide = new Ride({
    driverName: req.user.name,
    driverContact: req.user.contact,
    driverId: req.user._id,
    driverPhoto:req.user.driverVerification.livePhoto,
    driverCarName,
    driverCarNumber,
    leavingFrom,
    goingTo,
    date,
    time,
    NumberOfpassengers,
    price,
  });

  const savedRide = await newRide.save();



  return res
    .status(201)
    .json(new ApiResponse(201, savedRide, "Ride published successfully"));
});

const searchRides = asyncHandler(async (req, res) => {

  const { leavingFrom, goingTo, date, NumberOfpassengers } = req.body;

  const username = req.user.name;

  const rides = await Ride.find({
    driverName: { $ne: username },
    leavingFrom: leavingFrom,
    goingTo: goingTo,
    date: date,
    NumberOfpassengers: { $gte: NumberOfpassengers },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, rides, "Ride searched successfully"));
});

export { publishRide, searchRides };
