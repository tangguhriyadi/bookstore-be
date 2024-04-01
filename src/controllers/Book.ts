import { Request, Response } from "express";
import { BookService } from "../services/Book";
import { QueryDto } from "../dto/query";
import { BookDto } from "../dto/book";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { Book } from "../entities/Book";

interface BookControllerInterface {
    getAllBooks(
        req: Request<{}, BaseAPIResponse<Book[]>, {}, QueryDto>,
        res: Response<BaseAPIResponse>
    ): Promise<void>;
}

export class BookController implements BookControllerInterface {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    async getAllBooks(
        req: Request<{}, BaseAPIResponse, {}, QueryDto>,
        res: Response
    ): Promise<void> {
        try {
            const { query } = req;
            const { limit, page } = query;

            const dto = new BookDto(
                parseInt(page ?? "1"),
                parseInt(limit ?? "10")
            );

            const books = await this.bookService.getAllBooks(dto);

            res.json(books);
        } catch (err) {
            res.json({
                message: err,
                status: "error",
            });
        }
    }
}
