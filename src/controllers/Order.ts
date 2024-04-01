import { Request, Response } from "express";
import { Orderservice } from "../services/Order";
import { CancelOrderParam, OrderDto, OrderListDto } from "../dto/order";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { Order } from "../entities/Order";
import { QueryOrderDto } from "../dto/query";

interface OrderControllerInterface {
    getAll(
        req: Request<{}, BaseAPIResponse<Order[]>, {}, QueryOrderDto>,
        res: Response<BaseAPIResponse>
    ): Promise<void>;
    order(
        req: Request<{}, BaseAPIResponse, OrderDto>,
        res: Response<BaseAPIResponse>
    ): Promise<void>;
    cancelOrder(
        req: Request<CancelOrderParam, BaseAPIResponse>,
        res: Response<BaseAPIResponse>
    ): Promise<void>;
}

export class OrderController implements OrderControllerInterface {
    private orderService: Orderservice;

    constructor() {
        this.orderService = new Orderservice();
    }

    async getAll(
        req: Request<{}, BaseAPIResponse<Order[]>, {}, QueryOrderDto>,
        res: Response<BaseAPIResponse>
    ): Promise<void> {
        try {
            const { query } = req;
            const { limit, page, customer_id, is_canceled = false } = query;

            const dto = new OrderListDto(
                parseInt(page ?? "1"),
                parseInt(limit ?? "10"),
                parseInt(String(customer_id)),
                Boolean(is_canceled)
            );

            const orders = await this.orderService.getAll(dto);

            res.json(orders);
        } catch (err) {
            res.json({
                message: String(err),
                status: "error",
            });
        }
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
