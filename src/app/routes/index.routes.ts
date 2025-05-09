import express, { Request, Response } from "express";
import { errorHandler } from "../middlewares/errors/errorHandler.middleware";


const router = express.Router();



router.get("/hello-world", async (req: Request, res: Response) => {
    res.status(200).json({ data: "Hello from backend" });
});

router.use(errorHandler);

export default router;