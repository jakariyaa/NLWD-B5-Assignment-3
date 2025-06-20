import mongoose from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new mongoose.Schema<IBorrow, mongoose.Model<IBorrow>>(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Borrow = mongoose.model("Borrow", borrowSchema);
