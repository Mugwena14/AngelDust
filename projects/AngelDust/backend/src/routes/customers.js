import express from "express";
import { listCustomers, getCustomer } from "../controllers/customersController.js";

const router = express.Router();

// GET /api/customers → list all customers
router.get("/", listCustomers);

// GET /api/customers/:id → get a specific customer with booking history
router.get("/:id", getCustomer);

export default router;
