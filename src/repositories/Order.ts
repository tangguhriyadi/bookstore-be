import { QueryResult } from "pg";
import { OrderDto, OrderListDto } from "../dto/order";
import { Order } from "../entities/Order";
import db from "../infrastructure/db";

interface OrderRepositoryInterface {
    order(dto: OrderDto): Promise<Order>;
    cancelOrder(orderId: number): Promise<Order>;
    getAll(dto: OrderListDto): Promise<Order[]>;
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

    async getAll(dto: OrderListDto): Promise<Order[]> {
        const { limit, page, customer_id, is_canceled } = dto;
        const offset = (page - 1) * limit;
        const query: QueryResult<Order> = await db.query(
            `
            SELECT 
            o.id,
            json_build_object(
                'title', b.title,
                'price', b.price
            ) AS book,
            o.total_amount,
            o.is_canceled
            FROM 
                orders o
            JOIN 
                order_items oi ON oi.order_id = o.id
            JOIN
                books b ON b.id = oi.book_id
            WHERE 
                o.customer_id = ${customer_id} 
            AND
                o.is_canceled = ${is_canceled}
            GROUP BY 
                o.id, b.id
            ORDER BY
                o.id
            limit ${limit} offset ${offset}
            `
        );
        const totalItemsResult = await db.query("SELECT COUNT(*) FROM Books");
        const totalItems = parseInt(totalItemsResult.rows[0].count);
        const totalPages = Math.ceil(totalItems / limit);
        dto.totalItems = totalItems;
        dto.totalPages = totalPages;
        return Promise.resolve(query.rows);
    }
}
