import mongoose from "mongoose";

const UnavailabilitySchema = new mongoose.Schema({
  date: { type: String, required: true }, // YYYY-MM-DD
  startTime: { type: String, required: true }, // HH:mm
  endTime: { type: String, required: true }, // HH:mm
});

const AvailabilitySchema = new mongoose.Schema(
  {
    unavailableSlots: [UnavailabilitySchema], // list of blocked dates/times
  },
  { timestamps: true }
);

export default mongoose.model("Availability", AvailabilitySchema);
