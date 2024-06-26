export class CustomerDto {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}

export interface GetCustomerByIdParam {
    id: string
}
