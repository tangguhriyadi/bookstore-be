export default interface BaseAPIResponse<T = unknown> {
    status: "success" | "error";
    message: string;
    data?: T;
    pagination?: Pagination;
}

export class Pagination {
    totalItem: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;

    constructor(
        totalItem?: number,
        currentPage?: number,
        pageSize?: number,
        totalPages?: number
    ) {
        this.totalItem = totalItem || 0;
        this.currentPage = currentPage || 1;
        this.pageSize = pageSize || 1;
        this.totalPages = totalPages || 1;
    }
}
