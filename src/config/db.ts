import mongoose from "mongoose";

const connectDb = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
