import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    // origin: ["http://localhost:3000", "http://localhost:3001"],
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "'50kb'" }));
app.use(express.urlencoded({ extended: true, limit: "'50kb'" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import rideRouter from "./routes/ride.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rides", rideRouter);

export { app };
