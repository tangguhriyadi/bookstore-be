export class BookDto {
    page: number;
    limit: number;
    totalItems?: number;
    totalPages?: number

    

    constructor(page?: number, limit?: number) {
        this.page = page || 1;
        this.limit = limit || 10;
    }
}
