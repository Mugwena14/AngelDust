import { Router } from "express";
import { getAvailability, upsertAvailability } from "../controllers/availabilityController.js";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = Router();

router.get("/", getAvailability);

router.post("/", upsertAvailability);

export default router;
