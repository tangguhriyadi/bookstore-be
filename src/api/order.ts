import express from "express";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { OrderController } from "../controllers/Order";
import { Request, Response } from "express";
import { CancelOrderParam, OrderDto } from "../dto/order";
import { Order } from "../entities/Order";
import { QueryOrderDto } from "../dto/query";

const router = express.Router();

const orderController = new OrderController();

router.get<{}, BaseAPIResponse<Order[]>, {}, QueryOrderDto>(
    "/",
    (req: Request, res: Response) => orderController.getAll(req, res)
);

router.post<{}, BaseAPIResponse, OrderDto>("/", (req: Request, res: Response) =>
    orderController.order(req, res)
);

router.delete<CancelOrderParam, BaseAPIResponse>(
    "/:order_id",
    (req: Request<CancelOrderParam>, res: Response) =>
        orderController.cancelOrder(req, res)
);

export default router;
