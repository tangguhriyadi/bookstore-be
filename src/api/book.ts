import express from "express";
import { BookController } from "../controllers/Book";
import { Book } from "../entities/Book";
import BaseAPIResponse from "../interfaces/BaseAPIResponse";
const router = express.Router();

const bookController = new BookController();

router.get<{}, BaseAPIResponse<Book[]>>("/", (req, res) =>
    bookController.getAllBooks(req, res)
);

export default router
