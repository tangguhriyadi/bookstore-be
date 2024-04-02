import { CustomerDto, GetCustomerByIdParam } from "../dto/customer";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { CustomerService } from "../services/Customer";
import { Request, Response } from "express";

interface CustomerControllerInterface {
    create(
        req: Request<{}, BaseAPIResponse, CustomerDto>,
        res: Response
    ): Promise<void>;
    getPoint(
        req: Request<GetCustomerByIdParam, BaseAPIResponse>,
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

            const { email, name } = body;

            if (!email) {
                res.status(400).json({
                    message: "email is required",
                    status: "error",
                });
                return;
            }
            
            if (!name) {
                res.status(400).json({
                    message: "name is required",
                    status: "error",
                });
                return;
            }

            const createCustomer = await this.customerService.createCustomer(
                body
            );

            res.json(createCustomer);
        } catch (err) {
            res.status(500).json({
                message: err,
                status: "error",
            });
        }
    }
    async getPoint(
        req: Request<GetCustomerByIdParam, BaseAPIResponse>,
        res: Response
    ): Promise<void> {
        try {
            const { params } = req;
            const { id } = params;

            if (!id) {
                res.status(400).json({
                    message: "id is required",
                    status: "error",
                });
                return;
            }

            const getCustomerPoint = await this.customerService.getPoint(
                parseInt(id)
            );

            res.json(getCustomerPoint);
        } catch (err) {
            res.status(500).json({
                message: err,
                status: "error",
            });
        }
    }
}
