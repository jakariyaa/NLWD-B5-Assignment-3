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
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
const borrowRouter = (0, express_1.Router)();
// 6. Borrow a Book
borrowRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.body.book);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                error: {
                    name: "BookNotFound",
                    bookId: req.body.book,
                },
            });
            return;
        }
        if (book.available && book.copies >= req.body.quantity) {
            book.borrowCopies(req.body.quantity);
            book.save();
            const borrow = yield borrow_model_1.Borrow.create(req.body);
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrow,
            });
            return;
        }
        res.status(400).json({
            success: false,
            message: "Not enough available copies",
            error: {
                name: "BookNotAvailable",
                bookId: req.body.book,
                bookTitle: book.title,
                availableCopies: book.copies,
                requestedCopies: req.body.quantity,
            },
        });
    }
    catch (error) {
        next(error);
    }
}));
// 7. Borrowed Books Summary (Using Aggregation)
borrowRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo",
                },
            },
            {
                $unwind: "$bookInfo",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = borrowRouter;
