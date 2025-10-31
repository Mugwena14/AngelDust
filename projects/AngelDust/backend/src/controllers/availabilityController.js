import asyncHandler from "express-async-handler";
import Availability from "../models/Availability.js";

// 🟢 Get all unavailable slots
export const getUnavailableSlots = asyncHandler(async (req, res) => {
  const record = await Availability.findOne();
  if (!record) {
    return res.json({ unavailableSlots: [] });
  }
  res.json(record);
});



// 🟡 Add a new unavailable slot
export const addUnavailableSlot = asyncHandler(async (req, res) => {
  const { date, startTime, endTime } = req.body;

  let record = await Availability.findOne();
  if (!record) {
    record = new Availability({ unavailableSlots: [] });
  }

  record.unavailableSlots.push({ date, startTime, endTime });
  await record.save();

  res.json({ message: "Slot added", record });
});

// 🔴 Remove unavailable slot
export const removeUnavailableSlot = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const record = await Availability.findOne();
  if (!record) {
    return res.status(404).json({ message: "No record found" });
  }

  record.unavailableSlots = record.unavailableSlots.filter(
    (slot) => slot._id.toString() !== id
  );

  await record.save();
  res.json({ message: "Slot removed", record });
});
