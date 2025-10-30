import { Router } from "express";
import {
  createBooking,
  getAvailableSlots,
  listBookings,
  updateBookingStatus, 
  deleteBooking ,
  getBookingById,
} from "../controllers/bookingsController.js";

const router = Router();

// Create a new booking
router.post("/", createBooking);

// Get available time slots
router.get("/slots", getAvailableSlots);

// Get all bookings
router.get("/", listBookings);

// Edit status
router.patch("/:id/status", updateBookingStatus);

// Get Booking by id
router.get("/:id", getBookingById);

// Delete booking
router.delete("/:id", deleteBooking);

export default router;
