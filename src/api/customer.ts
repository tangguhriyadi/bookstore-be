import express from "express";
import { Request, Response } from "express";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { CustomerController } from "../controllers/Customer";
import { GetCustomerByIdParam } from "../dto/customer";
const router = express.Router();

const customerController = new CustomerController();

router.post<{}, BaseAPIResponse>("/", (req: Request, res: Response) =>
    customerController.create(req, res)
);

router.get<GetCustomerByIdParam, BaseAPIResponse>(
    "/:id/point",
    (req: Request<GetCustomerByIdParam, BaseAPIResponse>, res: Response) =>
        customerController.getPoint(req, res)
);
export default router;
