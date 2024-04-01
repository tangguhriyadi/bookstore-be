export class OrderDto {
    book_id: number;
    quantity: number;
    customer_id: number;
    order_date: string;
    total_amount?: number;
    order_id?: number;
    price_per_unit?: number;

    constructor(
        bookId: number,
        quantity: number,
        customerId: number,
        orderDate: string,
        totalAmount?: number,
        orderId?: number,
        pricePerUnit?: number
    ) {
        this.book_id = bookId;
        this.quantity = quantity;
        this.total_amount = totalAmount;
        this.customer_id = customerId;
        this.order_date = orderDate;
        this.order_id = orderId;
        this.price_per_unit = pricePerUnit;
    }
}

export interface CancelOrderParam {
    order_id: number;
}
