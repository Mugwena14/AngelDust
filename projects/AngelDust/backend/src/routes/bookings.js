import { Router } from "express";
import {
  createBooking,
  getAvailableSlots,
  listBookings,
} from "../controllers/bookingsController.js";

const router = Router();

// 🟢 Create a new booking
router.post("/", createBooking);

// 🟡 Get available time slots
router.get("/slots", getAvailableSlots);

// 🧾 (Optional) Get all bookings
router.get("/", listBookings);

export default router;
