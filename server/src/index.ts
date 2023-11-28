import express from "express";
import cors from "cors";
import  mongoose from "mongoose";
import dotenv from "dotenv";

import { userRouter } from "./routes/user";

// Load environment variables from .env file
dotenv.config();

const uri = process.env.REACT_APP_MONGODB_URI

//the app an instance of express
const app = express()

//middlewares for the express application
app.use(express.json())
app.use(cors())

// routes
app.use("/user", userRouter);

//connect to mongo database
mongoose.connect(uri);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});


app.listen(3001, () => console.log("server has started"))
