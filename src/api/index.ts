import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import { BookController } from "../controllers/Book";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
    res.json({
        message: "API - 👋🌎🌍🌏",
    });
});

const bookController = new BookController();

router.get("/books", (req, res) => bookController.getAllBooks(req, res));

export default router;
