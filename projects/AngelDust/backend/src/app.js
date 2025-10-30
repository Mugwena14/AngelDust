import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes"; // make sure this exists
import { errorHandler } from "./middlewares/errorHandler"; // make sure this exists

const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/api", routes);

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use(errorHandler);

  return app;
};

export default createApp;
