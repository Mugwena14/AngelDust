import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;

const connectDB = async () => {
  if (!uri) throw new Error("MONGO_URI not defined");

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
    console.log("MongoDB host:", mongoose.connection.host);
    console.log("MongoDB name:", mongoose.connection.name);
    console.log("MongoDB port:", mongoose.connection.port);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
