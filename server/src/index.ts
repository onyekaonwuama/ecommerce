import express from "express";
import cors from "cors";
import  mongoose from "mongoose";

//the app an instance of express
const app = express()

//middlewares for the express application
app.use(express.json())
app.use(cors())

//connect to mongo database
mongoose.connect();

app.listen(3001, () => console.log("server has started"))
