import { Request, Response } from "express";
import { Orderservice } from "../services/OrderService";
import { CancelOrderParam, OrderDto } from "../dto/order";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";

interface OrderControllerInterface {
    order(
        req: Request<{}, BaseAPIResponse, OrderDto>,
        res: Response
    ): Promise<void>;
    cancelOrder(
        req: Request<CancelOrderParam, BaseAPIResponse>,
        res: Response
    ): Promise<void>;
}

export class OrderController implements OrderControllerInterface {
    private orderService: Orderservice;

    constructor() {
        this.orderService = new Orderservice();
    }

    async order(req: Request<{}, {}, OrderDto>, res: Response): Promise<void> {
        try {
            const { body } = req;

            await this.orderService.order(body);

            res.json({
                message: "Success Order Book",
                status: "success",
            });
        } catch (err) {
            res.json({
                message: err,
                status: "error",
            });
        }
    }

    async cancelOrder(
        req: Request<CancelOrderParam>,
        res: Response
    ): Promise<void> {
        try {
            const { params } = req;
            const { order_id } = params;

            await this.orderService.cancelOrder(order_id);
        } catch (err) {
            res.json({
                message: err,
                status: "error",
            });
        }
    }
}
