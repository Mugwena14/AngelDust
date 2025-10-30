import Customer from "../models/Customer.js";
import Booking from "../models/Booking.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// 🟢 Get all customers
export const listCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });
  res.json(customers);
});

// 🟡 Get a specific customer with booking history
export const getCustomer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);

  if (!customer) {
    return res.status(404).json({ error: true, message: "Customer not found" });
  }

  const history = await Booking.find({ customer: customer._id })
    .populate("service")
    .sort({ date: -1 });

  res.json({ customer, history });
});
