import express from "express";
import cors from "cors";
import path from 'path';
import routes from "./app/routes/index.routes";
import { errorHandler } from "./app/middlewares/errors/errorHandler.middleware";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    // origin: config.CLIENT_URL,
    origin: "*",
  }),
);

app.use(express.static(path.join(__dirname, '../public')));

app.use("/api/v1", routes);

// Error handling
app.use(errorHandler);

export default app;