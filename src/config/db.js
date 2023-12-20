import mongoose from "mongoose";
import { config } from "dotenv";
config();
// Connect to the MongoDB cluster using the MONGO_URL environment variable
export const connectToDb = async () => {
  const mongoUrl = process.env.MONGO_URL;
  try {
    mongoose.connect(mongoUrl);
    console.log("database connected...");
  } catch (error) {
    throw error;
  }
};
