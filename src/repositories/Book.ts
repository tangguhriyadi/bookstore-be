import { Book } from "../entities/Book";
import { QueryResult } from "pg";

import db from "../infrastructure/db";

export class BookRepository {
    async getAll(): Promise<Book[]> {
        try {
            const query: QueryResult<Book> = await db.query(
                `SELECT * from books`
            );
            return query.rows;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    // getById(id: number): Promise<any> | undefined {
    //     try {
    //         const query = pool.query(`SELECT * from books WHERE id=${id}`);
    //         console.log(query);
    //         return query.then((q) => q.rows);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
}
