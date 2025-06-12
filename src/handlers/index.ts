import { NextFunction, Request, Response } from "express";
import { bulkCreateDishes } from "../repo/dishRepo";

export const createDishes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await bulkCreateDishes(req.body);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
