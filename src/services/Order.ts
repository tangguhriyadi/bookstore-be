import { OrderDto, OrderListDto } from "../dto/order";
import { Order } from "../entities/Order";
import BaseAPIResponse, { Pagination } from "../interfaces/BaseAPIResponse";
import { BookRepository } from "../repositories/Book";
import { CustomerRepository } from "../repositories/Customer";
import { OrderRepository } from "../repositories/Order";
import { OrderItemRepository } from "../repositories/OrderItem";
import db from "../infrastructure/db";

interface OrderServiceInterface {
    getAll(dto: OrderListDto): Promise<BaseAPIResponse<Order[]>>;
    order(dto: OrderDto): Promise<BaseAPIResponse>;
    cancelOrder(orderId: number): Promise<BaseAPIResponse>;
}

export class Orderservice implements OrderServiceInterface {
    private orderRepository: OrderRepository;
    private bookRepository: BookRepository;
    private customerRepository: CustomerRepository;
    private orderItemRepository: OrderItemRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
        this.bookRepository = new BookRepository();
        this.customerRepository = new CustomerRepository();
        this.orderItemRepository = new OrderItemRepository();
    }

    async getAll(dto: OrderListDto): Promise<BaseAPIResponse<Order[]>> {
        try {
            const order = await this.orderRepository.getAll(dto);
            if (order.length === 0) {
                return Promise.reject("No Order Found");
            }
            return Promise.resolve({
                message: "Success Get Orders",
                data: order,
                status: "success",
                pagination: new Pagination(
                    dto.totalItems,
                    dto.page,
                    dto.limit,
                    dto.totalPages
                ),
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async order(dto: OrderDto): Promise<BaseAPIResponse> {
        const tx = await db.connect();

        try {
            await tx.query("BEGIN");

            dto.order_date = new Date().toISOString();
            const { quantity, book_id, customer_id } = dto;

            // validate customer
            const customer = await this.customerRepository.getById(customer_id);
            if (!customer) {
                return Promise.reject({
                    message: "Customer Not Found",
                    code: 400,
                });
            }

            // validate book
            const book = await this.bookRepository.getById(book_id);
            if (!book) {
                return Promise.reject({
                    message: "Book Not Found",
                    code: 400,
                });
            }

            // validate order
            const orderItem = await this.orderItemRepository.getMany(dto);
            if (orderItem.length > 0) {
                return Promise.reject({
                    message: "You have already bought the book",
                    code: 400,
                });
            }

            dto.total_amount = quantity * book.price;
            dto.price_per_unit = book.price;

            // validate point
            if (dto.total_amount > customer.point) {
                return Promise.reject({
                    message: "Not enough point",
                    code: 400,
                });
            }

            const order = await this.orderRepository.order(dto);
            dto.order_id = order.id;

            await this.orderItemRepository.order(dto);

            // deduct
            await this.customerRepository.deduct(
                customer.id,
                customer.point - dto.total_amount
            );

            await tx.query("COMMIT");

            return Promise.resolve({
                message: "Success Order Book",
                status: "success",
            });
        } catch (err) {
            await tx.query("ROLLBACK");
            return Promise.reject(err);
        } finally {
            await tx.release();
        }
    }

    async cancelOrder(orderId: number): Promise<BaseAPIResponse> {
        try {
            const cancelOrder = await this.orderRepository.cancelOrder(orderId);

            if (!cancelOrder) {
                return Promise.reject("Failed to cancel");
            }

            const customer = await this.customerRepository.getById(
                cancelOrder.customer_id
            );

            const amount = cancelOrder.total_amount + customer.point;

            await this.orderRepository.refund(cancelOrder.customer_id, amount);

            return Promise.resolve({
                message: "success Cancel",
                status: "success",
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
