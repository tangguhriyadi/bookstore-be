import { CustomerDto } from "../dto/customer";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { CustomerService } from "../services/Customer";
import { Request, Response } from "express";

interface CustomerControllerInterface {
    create(
        req: Request<{}, BaseAPIResponse, CustomerDto>,
        res: Response
    ): Promise<void>;
}

export class CustomerController implements CustomerControllerInterface {
    private customerService: CustomerService;

    constructor() {
        this.customerService = new CustomerService();
    }

    async create(
        req: Request<{}, BaseAPIResponse, CustomerDto>,
        res: Response
    ): Promise<void> {
        try {
            const { body } = req;

            const createCustomer = await this.customerService.createCustomer(
                body
            );

            res.json(createCustomer);
        } catch (err) {
            res.json({
                message: err,
                status: "error",
            });
        }
    }
}
