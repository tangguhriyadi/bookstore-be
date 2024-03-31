import { Book } from "../entities/Book";
import { BookRepository } from "../repositories/Book";

export class BookService {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    async getAllBooks(): Promise<Book[]> {
        try {
            const books = this.bookRepository.getAll();
            return Promise.resolve(books);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    // getBookById(id: number): Book | undefined {
    //     return this.bookRepository.getById(id);
    // }
}
