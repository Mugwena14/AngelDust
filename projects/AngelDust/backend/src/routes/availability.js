import express from "express";
import {
    getUnavailableSlots,
    addUnavailableSlot,
    removeUnavailableSlot,
} from "../controllers/availabilityController.js";

const router = express.Router();

router.get("/", getUnavailableSlots);
router.post("/", addUnavailableSlot);
router.delete("/:id", removeUnavailableSlot);

export default router;