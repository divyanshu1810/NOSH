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
  const dishes = await Dish.findAll({
    limit: limit,
    offset: offset,
    order: [["createdAt", "DESC"]],
  });
  console.log(`Retrieved ${dishes.length} dishes from the database.`);
  return dishes;
};

export const toggleDishPublishedStatus = async (
  dishId: string
): Promise<void> => {
  const dish = await Dish.findOne({ where: { dishId } });
  if (!dish) {
    throw new Error(`Dish with ID ${dishId} not found.`);
  }

  dish.isPublished = !dish.isPublished;
  await dish.save();
  console.log(
    `Toggled published status for dish with ID ${dishId}. Now published: ${dish.isPublished}`
  );
};
