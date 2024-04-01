import { Book } from "../entities/Book";
import { QueryResult } from "pg";

import db from "../infrastructure/db";
import { BookDto } from "../dto/book";

interface BookRepositoryInterface {
    getAll(dto: BookDto): Promise<Book[]>;
    getById(bookId: number): Promise<Book>;
}

export class BookRepository implements BookRepositoryInterface {
    async getAll(dto: BookDto): Promise<Book[]> {
        try {
            const { limit, page } = dto;
            const offset = (page - 1) * limit;
            const query: QueryResult<Book> = await db.query(
                `SELECT
                b.id,
                b.title,
                b.price,
                b.cover_image,
                json_agg(g.name) AS genres,
                json_build_object(
                    'id', a.id,
                    'name', a.name
                ) AS auhtor
                FROM 
                    books b
                JOIN 
                    authors a ON a.id = b.author_id
                LEFT JOIN 
                    book_genres bg ON b.id = bg.book_id
                LEFT JOIN 
                    genres g ON g.id = bg.genre_id
                GROUP BY
                    b.id, a.id
                ORDER BY b.id
                limit ${limit} offset ${offset}`
            );
            const totalItemsResult = await db.query(
                "SELECT COUNT(*) FROM Books"
            );
            const totalItems = parseInt(totalItemsResult.rows[0].count);
            const totalPages = Math.ceil(totalItems / limit);
            dto.totalItems = totalItems;
            dto.totalPages = totalPages;
            return Promise.resolve(query.rows);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async getById(bookId: number): Promise<Book> {
        try {
            const query: QueryResult<Book> = await db.query(`
                SELECT * FROM books WHERE id=${bookId}
            `);

            return Promise.resolve(query.rows[0]);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
