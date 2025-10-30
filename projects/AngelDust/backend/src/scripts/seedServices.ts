import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/Service";
import connectDB from "../config/db";

dotenv.config();

const seedServices = async () => {
  try {
    await connectDB();

    // Clear old data
    await Service.deleteMany();
    console.log("🧹 Cleared existing services...");

    // Add new data
    const services = [
      {
        name: "Full Vehicle Wraps",
        description:
          "Transform your ride with precision-crafted wraps that turn heads and protect your investment.",
        price: 2500,
        duration: 120,
        image: "https://yourcdn.com/full-wrap.jpeg",
        videoUrl: "https://www.tiktok.com/@angeldustza/video/7564698438407834936",
      },
      {
        name: "Paint Protection Film",
        description:
          "Premium PPF that shields your vehicle from chips, scratches, and the elements with invisible armor.",
        price: 3500,
        duration: 180,
        image: "https://yourcdn.com/ppf.jpeg",
        videoUrl: "https://www.tiktok.com/@angeldustza/video/7468638222260460801",
      },
      {
        name: "Rim Color Wraps",
        description:
          "Customize your wheels with bold, durable rim colors that match your style and make your car stand out.",
        price: 800,
        duration: 60,
        image: "https://yourcdn.com/rims.png",
        videoUrl: "https://www.tiktok.com/@angeldustza/video/7457648228412325129",
      },
      {
        name: "Fleet Branding",
        description:
          "Elevate your business presence with cohesive, eye-catching designs across your entire fleet.",
        price: 5000,
        duration: 240,
        image: "https://yourcdn.com/fleet-branding.png",
        videoUrl: "https://www.tiktok.com/@angeldustza/video/7542591121458900225",
      },
    ];

    await Service.insertMany(services);

    console.log("Services seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding services:", error);
    process.exit(1);
  }
};

seedServices();
