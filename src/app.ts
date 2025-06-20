import express from "express";
import booksRouter from "./app/controllers/books.controller";
import borrowRouter from "./app/controllers/borrow.controller";
import { errorHandler } from "./app/middlewares/error.handler";
import { unknownEndpoint } from "./app/middlewares/unknown.endpoint";

const app = express();

app.use(express.json());

app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
