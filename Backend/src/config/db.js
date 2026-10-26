import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
