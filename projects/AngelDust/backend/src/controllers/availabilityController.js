import Availability from "../models/Availability.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// 🟢 Get availability settings
export const getAvailability = asyncHandler(async (req, res) => {
  const availability = await Availability.findOne();
  res.json(availability);
});

// 🟡 Create or update (upsert) availability settings
export const upsertAvailability = asyncHandler(async (req, res) => {
  const payload = req.body;

  let availability = await Availability.findOne();
  if (!availability) {
    availability = await Availability.create(payload);
  } else {
    Object.assign(availability, payload);
    await availability.save();
  }

  res.json(availability);
});
