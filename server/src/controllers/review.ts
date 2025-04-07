import { NextFunction, Request, Response } from "express";
import { createReview, getReviewById } from "../services/reviewService";

export const postReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, code } = req.body;
    if (!id || !code) {
      const error = new Error("Missing required fields: id or code");
      throw error;
    }

    const review = await createReview({ id, code });

    console.log(review);

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const getReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    console.log(req.params);
    if (!id) {
      const error = new Error("Missing required fields: id");
      throw error;
    }

    const review = await getReviewById({ id });

    console.log(review);

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};
