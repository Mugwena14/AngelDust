import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AvailabilitySchema = new Schema(
  {
    businessHours: [
      {
        day: { type: Number, required: true }, // 0=Sun..6=Sat
        start: { type: String, required: true }, // "09:00"
        end: { type: String, required: true },   // "17:00"
      }
    ],
    holidays: [{ type: String }], // ISO yyyy-mm-dd strings
    defaultCapacityPerSlot: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export default model("Availability", AvailabilitySchema);
