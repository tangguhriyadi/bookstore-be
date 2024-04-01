import { OrderDto } from "../dto/order";
import { Order } from "../entities/Order";
import db from "../infrastructure/db";

interface OrderRepositoryInterface {
    order(dto: OrderDto): Promise<Order>;
    cancelOrder(orderId: number): Promise<Order>;
}

export class OrderRepository implements OrderRepositoryInterface {
    async order(dto: OrderDto): Promise<Order> {
        try {
            const { customer_id, total_amount, order_date } = dto;
            const query = await db.query(
                `INSERT INTO orders (customer_id, order_date, total_amount) 
                VALUES (${customer_id}, '${order_date}', ${total_amount})
                RETURNING *
                `
            );
            return Promise.resolve(query.rows[0]);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async cancelOrder(orderId: number): Promise<Order> {
        try {
            const query = await db.query(
                `UPDATE orders
                SET is_canceled=true
                WHERE id=${orderId}
                RETURNING id`
            );

            return Promise.resolve(query.rows[0]);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
