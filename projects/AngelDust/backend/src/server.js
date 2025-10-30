// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "../src/config/db.js"; 

// Import routes and error handler
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // ✅ Connect to MongoDB
    await connectDB();

    const app = express();

    // ✅ Middleware
    app.use(cors()); 
    app.use(express.json());
    app.use(morgan("dev"));

    // ✅ API Routes
    app.use("/api", routes);

    // ✅ Health check route
    app.get("/health", (req, res) => res.json({ ok: true }));

    // ✅ Global error handler
    app.use(errorHandler);

    // ✅ Start server
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
