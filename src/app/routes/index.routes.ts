import express, { Request, Response } from "express";
import { errorHandler } from "../middlewares/errors/errorHandler.middleware";
import { Router } from 'express';
import authRoutes from './auth.routes';

const router = Router();


// Auth Routes
router.use('/auth', authRoutes);



router.get("/hello-world", async (req: Request, res: Response) => {
    res.status(200).json({ data: "Hello from backend" });
});
router.use(errorHandler);

export default router;