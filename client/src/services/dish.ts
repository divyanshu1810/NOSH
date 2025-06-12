import { Dish, DishesResponse } from "../types";

const API_BASE_URL =
  process.env.REACT_APP_PUBLIC_API_URL || "http://localhost:8000";

export const dishService = {
  async getDishes(
    limit: number = 10,
    offset: number = 0
  ): Promise<DishesResponse> {
    const response = await fetch(
      `${API_BASE_URL}/dishes?limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch dishes");
    }

    return response.json();
  },

  async toggleDishStatus(dishId: string): Promise<Dish> {
    const response = await fetch(`${API_BASE_URL}/dishes/${dishId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to toggle dish status");
    }

    return response.json();
  },
};
