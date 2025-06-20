import { Request, Response } from "express";

export function unknownEndpoint(req: Request, res: Response) {
  res.status(404).send({
    success: false,
    message: "Reached unknown endpoint",
    error: {
      name: "UnknownEndpoint",
      path: req.path,
    },
  });
}
