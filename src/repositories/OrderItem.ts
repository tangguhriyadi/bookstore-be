import { QueryResult } from "pg";
import { OrderDto } from "../dto/order";
import { OrderItem } from "../entities/OrderItem";
import db from "../infrastructure/db";

interface OrderItemRepositoryInterface {
    order(dto: OrderDto): Promise<void>;
    getMany(dto: OrderDto): Promise<OrderItem[]>;
}

export class OrderItemRepository implements OrderItemRepositoryInterface {
    async order(dto: OrderDto): Promise<void> {
        try {
            const { order_id, book_id, quantity, price_per_unit } = dto;
            await db.query(
                `INSERT INTO order_items (order_id, book_id, quantity, price_per_unit) 
                VALUES (${order_id}, '${book_id}', ${quantity}, ${price_per_unit} )`
            );
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async getMany(dto: OrderDto): Promise<OrderItem[]> {
        try {
            const { customer_id, book_id } = dto;

            const orderItem: QueryResult<OrderItem> = await db.query(`
                SELECT 
                    o.id
                FROM 
                    orders o
                JOIN
                    order_items oi ON oi.order_id = o.id
                AND
                    o.customer_id = ${customer_id}
                AND 
                    oi.book_id = ${book_id}

            `);

            return Promise.resolve(orderItem.rows);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
