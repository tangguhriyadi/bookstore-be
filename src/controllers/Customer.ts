import { CustomerDto } from "../dto/customer";
import { CustomerService } from "../services/Customer";
import { Request, Response } from "express";

interface CustomerControllerInterface {
    create(req: Request, res: Response): Promise<void>;
}

export class CustomerController implements CustomerControllerInterface {
    private customerService: CustomerService;

    constructor() {
        this.customerService = new CustomerService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { body } = req;

            const { email, name } = body as CustomerDto;

            const createCustomer = await this.customerService.createCustomer({
                email,
                name,
            });

            res.json(createCustomer);
        } catch (err) {
            res.json({
                message: err,
                status: "error",
            });
        }
    }
}
