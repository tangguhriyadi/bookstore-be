import { Request, Response } from "express";
import { BookService } from "../services/Book";
import { Book } from "../entities/Book";

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    async getAllBooks(req: Request, res: Response): Promise<void> {
        const books = await this.bookService.getAllBooks();
        console.log("controller", books);
        res.json(books);
    }

    // getBookById(req: Request, res: Response): void {
    //     const id = parseInt(req.params.id);
    //     const book = this.bookService.getBookById(id);
    //     if (book) {
    //         res.json(book);
    //     } else {
    //         res.status(404).send("Book not found");
    //     }
    // }
}
