import db from "../infrastructure/db";
import { CustomerDto } from "../dto/customer";
import { Customer } from "../entities/Customer";
import { QueryResult } from "pg";

interface CustomerRepositoryInterface {
    create(dto: CustomerDto): Promise<Customer>;
    getById(customerId: number): Promise<Customer>;
    deduct(customerId: number, amount: number): Promise<void>;
}

export class CustomerRepository implements CustomerRepositoryInterface {
    async create(dto: CustomerDto): Promise<Customer> {
        try {
            const { email, name } = dto;
            const query = await db.query(`
                INSERT INTO customers (name, email, point)
                VALUES ('${name}', '${email}', 100)
                RETURNING *
            `);
            const result = query.rows[0] as Customer;
            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async getById(customerId: number): Promise<Customer> {
        try {
            const query = await db.query(`
            SELECT * FROM customers WHERE id=${customerId}
        `);

            const res = query.rows[0];

            res.point = parseInt(query.rows[0].point);

            return Promise.resolve(query.rows[0]);
        } catch (err) {
            return Promise.reject(err);
        }
    }
    async deduct(customerId: number, amount: number): Promise<void> {
        try {
            await db.query(`
            UPDATE customers 
            SET point=${amount}
            WHERE id=${customerId}
        `);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
