import { OrderDto } from "../dto/order";
import db from "../infrastructure/db";

interface OrderItemRepositoryInterface {
    order(dto: OrderDto): Promise<void>;
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
}
