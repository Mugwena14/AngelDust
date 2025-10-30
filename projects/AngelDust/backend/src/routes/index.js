import { Router } from "express";
import services from "./services.js";
import bookings from "./bookings.js";
import availability from "./availability.js";

const router = Router();

router.use("/services", services);
router.use("/bookings", bookings);
router.use("/availability", availability);

export default router;
