"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_model_1 = require("../models/book.model");
const booksRouter = (0, express_1.Router)();
// 1. Create Book
booksRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// 2. Get All Books
booksRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy, sort = "asc", limit = 10 } = req.query;
    const sortByKey = sortBy;
    const sortOrder = sort;
    const limitNumber = Number(limit) || 10;
    const filterValue = filter;
    let books;
    if (filterValue) {
        books = yield book_model_1.Book.find({ genre: filter })
            .sort({ [sortByKey]: sortOrder })
            .limit(limitNumber);
    }
    else {
        books = yield book_model_1.Book.find()
            .sort({ [sortByKey]: sortOrder })
            .limit(limitNumber);
    }
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
    });
}));
// 3. Get Book by ID
booksRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    console.log(bookId);
    const book = yield book_model_1.Book.findById(bookId);
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
    });
}));
// 4. Update Book by ID
booksRouter.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const book = yield book_model_1.Book.findById(bookId);
    if (!book) {
        res.status(404).json({
            success: false,
            message: "Book not found",
            error: {
                name: "BookNotFound",
                bookId: bookId,
            },
        });
        return;
    }
    book.set(req.body);
    yield book.save();
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
    });
}));
// 5. Delete Book by ID
booksRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    yield book_model_1.Book.findByIdAndDelete(bookId);
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
}));
exports.default = booksRouter;
