import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import todoRoute from "../Backend/routes/todo.route.js"
import userRoute from "../Backend/routes/user.route.js"

const app = express()


dotenv.config();
const PORT= process.env.PORT || 4001;
const DB_URI= process.env.MONGODB_URI

// middlewares

app.use(express.json());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:"GET,POST,PUT,DELETE",
  allowedHeaders:["content-Type","Authorization"]
}))




// Database connection code
try {
    await mongoose.connect(DB_URI)
    console.log("connected to mongodb");
} catch (error) {
    console.log(error);
}

// routes

app.use("/todo",todoRoute)
app.use("/user",userRoute)

app.listen(PORT, () => {
  console.log(`Server is runnig on ${PORT}`)
})