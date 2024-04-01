import express from "express";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { CustomerController } from "../controllers/Customer";
const router = express.Router();

const bookController = new CustomerController();

router.post<{}, BaseAPIResponse>("/", (req, res) =>
    bookController.create(req, res)
);

export default router;
