export interface Dish {
  dishId: string;
  dishName: string;
  imageUrl: string;
  isPublished: boolean;
}

export interface DishesResponse {
  dishes: Dish[];
  nextKey: string | null;
}

export interface ToggleDishRequest {
  dishId: string;
  isPublished: boolean;
}