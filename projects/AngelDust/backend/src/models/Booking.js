import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    vehicle: {
      make: String,
      model: String,
      year: String,
      color: String,
      plate: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
      set: (val) => val.toUpperCase(), 
    },
  },
  { timestamps: true }
);

BookingSchema.index({ service: 1, date: 1, time: 1 });
export default mongoose.model("Booking", BookingSchema);



