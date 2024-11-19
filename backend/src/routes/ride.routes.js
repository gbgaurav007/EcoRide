import { Router } from "express";
import { publishRide, searchRides,bookRide, getSavedRides } from "../controllers/Ride.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const rideRouter = Router();

rideRouter.route("/publishRide").post(verifyJWT, publishRide);
rideRouter.route("/searchRides").post(verifyJWT, searchRides);
rideRouter.route("/bookRide").post(verifyJWT, bookRide);
rideRouter.route("/savedRides").get(verifyJWT, getSavedRides);

export default rideRouter;
