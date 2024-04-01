import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import api from "./api";
import BaseAPIResponse from "./interfaces/BaseAPIResponse";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, BaseAPIResponse>("/", (req, res) => {
    res.json({
        message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
        status: "success",
    });
});

app.use("/api/v1", api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

export default app;
