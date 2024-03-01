import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log("connected to MONGODB");
  } catch (error) {
    console.log("couldnt connect to MONGODB");
  }
}

export default connectMongoDB;
