import { OrderDto } from "../dto/order";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { BookRepository } from "../repositories/Book";
import { CustomerRepository } from "../repositories/Customer";
import { OrderRepository } from "../repositories/Order";
import { OrderItemRepository } from "../repositories/OrderItem";

interface OrderServiceInterface {
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

    async order(dto: OrderDto): Promise<BaseAPIResponse> {
        try {
            dto.order_date = new Date().toISOString();
            const { quantity, book_id, customer_id } = dto;

            // validate customer
            const customer = await this.customerRepository.getById(customer_id);
            if (!customer) {
                return Promise.reject("Customer Not Found");
            }

            // validate book
            const book = await this.bookRepository.getById(book_id);
            if (!book) {
                return Promise.reject("Book Not Found");
            }

            dto.total_amount = quantity * book.price;
            dto.price_per_unit = book.price;

            // validate point
            if (dto.total_amount > customer.point) {
                return Promise.reject("Not Enough Point");
            }

            const order = await this.orderRepository.order(dto);
            dto.order_id = order.id;

            await this.orderItemRepository.order(dto);

            return Promise.resolve({
                message: "Success Order Book",
                status: "success",
            });
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async cancelOrder(orderId: number): Promise<BaseAPIResponse> {
        try {
            const cancelOrder = this.orderRepository.cancelOrder(orderId);

            if (!cancelOrder) {
                return Promise.reject("Failed to cancel");
            }
            return Promise.resolve({
                message: "success Cancel",
                status: "success",
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
