import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CustomerSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export default model("Customer", CustomerSchema);
