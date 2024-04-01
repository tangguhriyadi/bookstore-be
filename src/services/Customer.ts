import { CustomerDto } from "../dto/customer";
import { Customer } from "../entities/Customer";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { CustomerRepository } from "../repositories/Customer";

interface CustomerServiceInterface {
    createCustomer(dto: CustomerDto): Promise<BaseAPIResponse<Customer>>;
}

export class CustomerService implements CustomerServiceInterface {
    private customerRepository: CustomerRepository;

    constructor() {
        this.customerRepository = new CustomerRepository();
    }

    async createCustomer(dto: CustomerDto): Promise<BaseAPIResponse<Customer>> {
        try {
            const customer = await this.customerRepository.create(dto);

            return Promise.resolve({
                message: "Success Create Customer",
                status: "success",
                data: customer,
            });
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
