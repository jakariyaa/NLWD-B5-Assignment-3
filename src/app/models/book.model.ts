import mongoose from "mongoose";
import { IBookInterfaceMethods, IBook } from "../interfaces/book.interface";
import validator from "validator";

const bookSchema = new mongoose.Schema<
  IBook,
  mongoose.Model<IBook>,
  IBookInterfaceMethods
>(
  {
    title: { type: String, required: true, trim: true },
    author: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value: string) => /^[a-zA-Z'. -]+$/.test(value),
        message: "Invalid author name",
      },
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: {
      validate: [validator.isISBN, "Invalid ISBN"],
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Mongoose instance method
bookSchema.methods.borrowCopies = function (borrowQuantity: number) {
  if (this.copies < borrowQuantity) {
    throw new Error("Not enough available copies");
  }
  this.copies = this.copies - borrowQuantity;
  if (this.copies === 0) {
    this.available = false;
  }
};

// Mongoose middleware (pre-save hook)
bookSchema.pre("save", function (next) {
  if (this.copies > 0) {
    this.available = true;
  }
  next();
});

// Mongoose middleware (post-save hook)
bookSchema.post("save", function (doc, next) {
  console.log("Book saved:", doc.title);
  next();
});

bookSchema.post("findOneAndDelete", function (doc, next) {
  doc && console.log("Book deleted:", doc.title);
  next();
});

export const Book = mongoose.model("Book", bookSchema);
