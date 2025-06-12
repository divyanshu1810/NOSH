import { Dish } from "../dao/dish";

export const bulkCreateDishes = async (dishes: Dish[]): Promise<void> => {
  if (dishes.length === 0) {
    console.log("No dishes to create.");
    return;
  }

  await Dish.bulkCreate(dishes, {
    updateOnDuplicate: ["dishName", "imageUrl", "isPublished"],
  });

  console.log(`✅ Successfully created/updated ${dishes.length} dishes.`);
};

export const getAllDishes = async (
  limit: number,
  offset: number
): Promise<Dish[]> => {
  return await Dish.findAll({
    limit: limit,
    offset: offset,
    order: [["createdAt", "DESC"]],
    attributes: ["dishId", "dishName", "imageUrl", "isPublished"],
  });
};

export const getDishById = async (dishId: string): Promise<Dish | null> => {
  return await Dish.findOne({ where: { dishId } });
}
