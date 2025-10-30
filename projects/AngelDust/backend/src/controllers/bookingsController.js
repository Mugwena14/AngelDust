import Booking from "../models/Booking.js";
import Customer from "../models/Customer.js";
import Service from "../models/Service.js";

// 🟢 Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { serviceId, date, time, vehicle, customer } = req.body;

    if (!serviceId || !date || !time || !customer?.name || !customer?.phone) {
      return res.status(400).json({ message: "Missing required booking details" });
    }

    // Validate service
    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    // Check for existing booking
    const existingBooking = await Booking.findOne({ service: serviceId, date, time });
    if (existingBooking)
      return res.status(409).json({ message: "Selected slot is no longer available." });

    // Find or create customer
    let customerDoc = await Customer.findOne({ phone: customer.phone });
    if (!customerDoc) {
      customerDoc = await Customer.create({
        name: customer.name,
        phone: customer.phone,
        email: customer.email || "",
      });
    }

    // Create booking
    const booking = await Booking.create({
      service: service._id,
      date,
      time,
      vehicle: {
        make: vehicle?.make || "",
        model: vehicle?.model || "",
        year: vehicle?.year || "",
        color: vehicle?.color || "",
        plate: vehicle?.plate || "",
      },
      customer: customerDoc._id,
      status: "pending",
    });

    // Populate references
        await booking.populate([
      { path: "service" },
      { path: "customer" },
    ]);

    res.status(201).json(booking);

  } catch (err) {
    console.error("❌ Booking creation error:", err);
    res.status(500).json({ message: "Server error creating booking", error: err.message });
  }
};

// 🕐 Get available time slots
export const getAvailableSlots = async (req, res) => {
  try {
    const { serviceId, date } = req.query;

    if (!serviceId || !date) {
      return res.status(400).json({ message: "Missing serviceId or date" });
    }

    const service = await Service.findById(serviceId);
    if (!service) return res.status(404).json({ message: "Service not found" });

    const startHour = 8;
    const endHour = 17;
    const slotDuration = service.duration || 60;

    const slots = [];
    for (let hour = startHour; hour < endHour; hour += slotDuration / 60) {
      const time = `${String(Math.floor(hour)).padStart(2, "0")}:${(hour % 1) * 60 === 0 ? "00" : "30"}`;
      slots.push(time);
    }

    const booked = await Booking.find({ service: serviceId, date }).select("time");
    const bookedTimes = booked.map((b) => b.time);

    const result = slots.map((t) => ({
      time: t,
      available: !bookedTimes.includes(t),
    }));

    res.json(result);
  } catch (err) {
    console.error("Error fetching slots:", err);
    res.status(500).json({ message: "Error fetching slots", error: err.message });
  }
};

//  List all bookings

export const listBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("service")
      .populate("customer")
      .sort({ createdAt: -1 });

    console.log(
      "Fetched bookings:",
      bookings.map((b) => ({ id: b._id, status: b.status }))
    );

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    let { status } = req.body;

    status = status.toUpperCase();

    const validStatuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    console.log("Updating booking:", id, "to status:", status);

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("service")
      .populate("customer");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (err) {
    console.error("❌ Error updating booking status:", err);
    res.status(500).json({ message: "Error updating booking status", error: err.message });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({ message: "Error deleting booking", error: err.message });
  }
};