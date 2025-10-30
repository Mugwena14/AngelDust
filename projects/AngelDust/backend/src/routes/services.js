// routes/servicesRoute.js
import { Router } from "express";
import {
  listServices,
  createService,
  updateService,
  deleteService,
  seedServices,
} from "../controllers/servicesController.js";

const router = Router();

// 🟢 Fetch all services
router.get("/", listServices);

// 🟡 Create a new service
router.post("/", createService);

// 🟠 Update a service by ID
router.put("/:id", updateService);

// 🔴 Delete a service by ID
router.delete("/:id", deleteService);

// 🧩 Seed the default services
router.post("/seed", seedServices);

export default router;
