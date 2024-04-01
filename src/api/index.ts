import express from "express";

import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import BookRouter from "./book";
import CustomerRouter from "./customer";

const router = express.Router();

router.get<{}, BaseAPIResponse>("/", (req, res) => {
    res.json({
        message: "API - 👋🌎🌍🌏",
        status: "success",
    });
});

router.use("/books", BookRouter);
router.use("/customers", CustomerRouter);

export default router;
