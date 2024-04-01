import express from "express";
import { Request, Response } from "express";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { CustomerController } from "../controllers/Customer";
const router = express.Router();

const bookController = new CustomerController();

router.post<{}, BaseAPIResponse>("/", (req: Request, res: Response) =>
    bookController.create(req, res)
);

export default router;
