import { Request, Response, NextFunction } from "express";
import { MongoError } from "../interfaces/error.interface";

export function errorHandler(
  error: MongoError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`Error occurred: ${error.name} \n`, error.message);

  if (error.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
    return;
  } else if (error.code === 11000) {
    res.status(400).json({
      success: false,
      message: "Duplicate value rejected",
      error: error,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: error.message,
    error: error,
  });

  next();
}
