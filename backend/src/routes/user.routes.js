import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  verifyDriver,
} from "../controllers/User.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);
userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword);
userRouter.route("/current-user").get(verifyJWT, getCurrentUser);
userRouter.route("/verifyDriver").post(
  verifyJWT,
  upload.fields([
    {
      name: "livePhoto",
      maxCount: 1,
    },
  ]),
  verifyDriver
);

export default userRouter;
