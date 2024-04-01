import express from "express";

import BaseAPIResponse from "../interfaces/BaseAPIResponse";
import BookRouter from "./book";
import CustomerRouter from "./customer";
import OrderRouter from "./order";

const router = express.Router();

router.get<{}, BaseAPIResponse>("/", (req, res) => {
    res.json({
        message: "API - 👋🌎🌍🌏",
        status: "success",
    });
});

router.use("/books", BookRouter);
router.use("/customers", CustomerRouter);
router.use("/orders", OrderRouter);

export default router;
