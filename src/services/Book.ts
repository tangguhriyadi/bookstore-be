import { BookDto } from "../dto/book";
import { Book } from "../entities/Book";
import BaseAPIResponse, { Pagination } from "../interfaces/BaseAPIResponse";
import { BookRepository } from "../repositories/Book";

interface BookServiceInterface {
    getAllBooks(dto: BookDto): Promise<BaseAPIResponse<Book[]>>;
}

export class BookService implements BookServiceInterface {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    async getAllBooks(dto: BookDto): Promise<BaseAPIResponse<Book[]>> {
        try {
            const books = await this.bookRepository.getAll(dto);
            if (books.length === 0) {
                return Promise.reject("Books not found");
            }
            return Promise.resolve({
                message: "Success get books",
                data: books,
                status: "success",
                pagination: new Pagination(
                    dto.totalItems,
                    dto.page,
                    dto.limit,
                    dto.totalPages
                ),
            });
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
