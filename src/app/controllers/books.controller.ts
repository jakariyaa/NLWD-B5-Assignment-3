import { Router, Request, Response, NextFunction } from "express";
import { IBook, IBookQueryParams } from "../interfaces/book.interface";
import { Book } from "../models/book.model";

const booksRouter = Router();

// 1. Create Book
booksRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// 2. Get All Books
booksRouter.get("/", async (req: Request, res: Response) => {
  const {
    filter,
    sortBy,
    sort = "asc",
    limit = 10,
  }: IBookQueryParams = req.query;

  const books = await Book.find(
    filter
      ? {
          genre: filter,
        }
      : {}
  )
    .sort(
      sortBy
        ? {
            [sortBy]: sort,
          }
        : {}
    )
    .limit(limit);

  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

// 3. Get Book by ID
booksRouter.get("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
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
  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});

// 4. Update Book by ID
booksRouter.put(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
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
    try {
      book.set(req.body);
      await book.save();
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);

// 5. Delete Book by ID
booksRouter.delete("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = await Book.findByIdAndDelete(bookId);
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
  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
});

export default booksRouter;
