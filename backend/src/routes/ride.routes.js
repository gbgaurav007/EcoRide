import { Router } from "express";
import { publishRide, searchRides } from "../controllers/Ride.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const rideRouter = Router();

rideRouter.route("/publishRide").post(verifyJWT, publishRide);
rideRouter.route("/searchRides").post(verifyJWT, searchRides);

export default rideRouter;
