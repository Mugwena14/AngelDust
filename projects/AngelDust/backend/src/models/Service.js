import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  image: String,
  videoUrl: String,
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
