import { Router, Request, Response, NextFunction } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

const borrowRouter = Router();

// 6. Borrow a Book
borrowRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.findById(req.body.book);
      if (!book) {
        res.status(404).json({
          success: false,
          message: "Book not found",
          info: {
            bookId: req.body.book,
          },
        });
        return;
      }
      if (book.available && book.copies >= req.body.quantity) {
        book.borrowCopies(req.body.quantity);
        book.save();
        const borrow = await Borrow.create(req.body);
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
        info: {
          bookId: req.body.book,
          bookTitle: book.title,
          availableCopies: book.copies,
          requestedCopies: req.body.quantity,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

// 7. Borrowed Books Summary (Using Aggregation)
borrowRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const summary = await Borrow.aggregate()
        .group({
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        })
        .lookup({
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        })
        .unwind("$bookInfo")
        .project({
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        })
        .exec();

      res.json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default borrowRouter;
