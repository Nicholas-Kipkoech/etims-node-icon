import mongoose from "mongoose";

const connectDb = async (url) => {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("error", error);
  }
};

export default connectDb;
