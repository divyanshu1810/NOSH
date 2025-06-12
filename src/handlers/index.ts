import { NextFunction, Request, Response } from "express";
import {
  bulkCreateDishes,
  getAllDishes,
  getDishById,
} from "../repo/dishRepo";

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

export const fetchDishes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const dishes = await getAllDishes(Number(limit), Number(offset));
    const nextKey = {
      limit: Number(limit),
      offset: Number(offset) + Number(limit),
    };
    res.status(200).json({
      dishes,
      nextKey: dishes.length < Number(limit) ? null : nextKey,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleDishStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { dishId } = req.params;
    const dish = await getDishById(dishId);
    if (!dish) {
      throw new Error(`Dish with ID ${dishId} not found.`);
    }
    dish.isPublished = !dish.isPublished;
    await dish.save();
    res.status(200).json({});
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).json({ error: error.message });
      return;
    }
    next(error);
  }
};
