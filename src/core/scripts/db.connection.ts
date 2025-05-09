import mongoose from "mongoose";
import config from "../../config";
import { Request, Response, NextFunction } from "express";

let isConnected: boolean = false;

export async function connectToDatabase() {
  try {
    if (isConnected) {
      console.log("Using existing MongoDB connection");
      return isConnected;
    }

    const dbConnectionUrl = config.MONGODB_CONNECTION_URL;
    await mongoose.connect(dbConnectionUrl);
    isConnected = true;

    console.log("Connected to MongoDB database");

    return isConnected;
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    throw error;
  }
}
export async function connectToServerlessDatabase(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (isConnected) {
      console.log("Using existing MongoDB connection");
      next();
    }

    const dbConnectionUrl = config.MONGODB_CONNECTION_URL;
    await mongoose.connect(dbConnectionUrl);
    console.log("Connected to MongoDB database");

    next();
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error);
    throw error;
  }
}

// Connect to the database when this module is imported
// connectToDatabase().catch(error => console.error("Error:", error));

export function getDatabaseConnection() {
  if (!isConnected) {
    throw new Error("Database is not connected");
  } else {
    connectToDatabase().catch(error => console.error("Error:", error));
  }
  return mongoose.connection;
}