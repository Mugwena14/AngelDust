import { Router } from "express";
import services from "./services.js";
import bookings from "./bookings.js";
import availability from "./availability.js";
import customers from "./customers.js";

const router = Router();

router.use("/services", services);
router.use("/bookings", bookings);
router.use("/availability", availability);
router.use("/customers", customers);

export default router;
