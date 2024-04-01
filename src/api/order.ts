import express from "express";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { OrderController } from "../controllers/Order";
import { Request, Response } from "express";
import { CancelOrderParam, OrderDto } from "../dto/order";

const router = express.Router();

const orderController = new OrderController();

router.post<{}, BaseAPIResponse, OrderDto>("/", (req: Request, res: Response) =>
    orderController.order(req, res)
);

router.delete<CancelOrderParam, BaseAPIResponse>(
    "/:order_id",
    (req: Request<CancelOrderParam>, res: Response) =>
        orderController.cancelOrder(req, res)
);

export default router;
