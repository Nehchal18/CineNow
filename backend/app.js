// const express = require('express'); outdated in es5
import express from "express"; // es6
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
// import cors from 'cors';

dotenv.config();
const app = express();

import cors from "cors";
const corsOptions = {
  origin: '*', // Allow this origin
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
}

app.use(cors(corsOptions));
app.use(express.json());

// middleware
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

mongoose
  .connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.60aia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() =>
    app.listen(3000, () => console.log("Server is running on port 3000"))
  )
  .catch((error) => console.log(error.message));

