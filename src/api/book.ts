import express from "express";
import { Request, Response } from "express";
import { BookController } from "../controllers/Book";
import { Book } from "../entities/Book";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { QueryDto } from "../dto/query";
const router = express.Router();

const bookController = new BookController();

router.get<{}, BaseAPIResponse<Book[]>, {}, QueryDto>(
    "/",
    (req: Request, res: Response) => bookController.getAllBooks(req, res)
);

export default router;
