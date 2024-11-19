import mongoose, { Schema } from "mongoose";

const rideSchema = new Schema(
  {
    driverName: {
      type: String,
    },
    driverContact: {
      type: Number,
    },
    driverCarName: {
      type: String,
    },
    driverCarNumber: {
      type: String,
    },
    driverPhoto: {
      type: String,
    },
    leavingFrom: {
      type: String,
      required: true,
    },
    goingTo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    NumberOfpassengers: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    people: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export const Ride = mongoose.model("Ride", rideSchema);
