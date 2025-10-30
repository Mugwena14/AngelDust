// controllers/servicesController.js
import Service from "../models/Service.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";

// ✅ 1. Get all services
export const listServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ title: 1 });
  res.status(200).json(services);
});

// ✅ 2. Create a new service (Admin)
export const createService = asyncHandler(async (req, res) => {
  const { title, description, price, duration, image, videoUrl } = req.body;

  if (!title || !description || !price || !duration) {
    res.status(400);
    throw new Error("All required fields must be provided");
  }

  const existing = await Service.findOne({ title });
  if (existing) {
    res.status(400);
    throw new Error("A service with this title already exists");
  }

  const newService = await Service.create({
    title,
    description,
    price,
    duration,
    image,
    videoUrl,
  });

  res.status(201).json(newService);
});

// ✅ 3. Update a service
export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedService) {
    res.status(404);
    throw new Error("Service not found");
  }

  res.status(200).json(updatedService);
});

// ✅ 4. Delete a service
export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Service.findByIdAndDelete(id);

  if (!deleted) {
    res.status(404);
    throw new Error("Service not found");
  }

  res.status(200).json({ message: "Service deleted successfully" });
});

// ✅ 5. Seed default services (Admin)
export const seedServices = asyncHandler(async (req, res) => {
  const defaultServices = [
    {
      title: "Full Vehicle Wraps",
      description:
        "Transform your ride with precision-crafted wraps that turn heads and protect your investment.",
      price: 5000,
      duration: 120,
      image: "/images/full-wrap.jpeg",
      videoUrl: "https://www.tiktok.com/@angeldustza/video/7564698438407834936",
    },
    {
      title: "Paint Protection Film",
      description:
        "Premium PPF that shields your vehicle from chips, scratches, and the elements with invisible armor.",
      price: 4000,
      duration: 90,
      image: "/images/ppf.jpeg",
      videoUrl: "https://www.tiktok.com/@angeldustza/video/7468638222260460801",
    },
    {
      title: "Rim Color Wraps",
      description:
        "Customize your wheels with bold, durable rim colors that match your style and make your car stand out.",
      price: 1500,
      duration: 60,
      image: "/images/Rims.png",
      videoUrl: "https://www.tiktok.com/@angeldustza/video/7457648228412325129",
    },
    {
      title: "Fleet Branding",
      description:
        "Elevate your business presence with cohesive, eye-catching designs across your entire fleet.",
      price: 6000,
      duration: 240,
      image: "/images/fleet-branding.png",
      videoUrl: "https://www.tiktok.com/@angeldustza/video/7542591121458900225",
    },
  ];

  await Service.deleteMany();
  const inserted = await Service.insertMany(defaultServices);

  res.status(201).json({
    message: "Services seeded successfully",
    count: inserted.length,
    data: inserted,
  });
});
