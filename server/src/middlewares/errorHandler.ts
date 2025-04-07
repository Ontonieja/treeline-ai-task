import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
  status?: number;
}

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message);

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong",
  });
};
