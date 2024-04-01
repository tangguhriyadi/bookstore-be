import db from "../infrastructure/db";
import { CustomerDto } from "../dto/customer";
import { Customer } from "../entities/Customer";

interface CustomerRepositoryInterface {
    create(dto: CustomerDto): Promise<Customer>;
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
}
