import express from "express";

import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import { BookController } from "../controllers/Book";
import { Book } from "../entities/Book";

const router = express.Router();

router.get<{}, BaseAPIResponse>("/", (req, res) => {
    res.json({
        message: "API - 👋🌎🌍🌏",
        status: "success",
    });
});

const bookController = new BookController();

router.get<{}, BaseAPIResponse<Book[]>>("/books", (req, res) =>
    bookController.getAllBooks(req, res)
);

export default router;
