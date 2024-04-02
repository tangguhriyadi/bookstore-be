import { CustomerDto } from "../dto/customer";
import { Customer } from "../entities/Customer";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { CustomerRepository } from "../repositories/Customer";

interface CustomerServiceInterface {
    createCustomer(dto: CustomerDto): Promise<BaseAPIResponse<Customer>>;
    getPoint(id: number): Promise<BaseAPIResponse<Partial<Customer>>>;
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
    async getPoint(id: number): Promise<BaseAPIResponse<Partial<Customer>>> {
        try {
            const customer = await this.customerRepository.getById(id);

            if (!customer) {
                return Promise.reject("customer not found");
            }

            const result = {
                point: customer.point,
            };

            return Promise.resolve({
                message: "success",
                status: "success",
                data: result,
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
