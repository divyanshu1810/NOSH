import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dishService } from "../services/dish";
import { Dish } from "../types";

export const QUERY_KEYS = {
  DISHES: ["dishes"],
};

export const useDishes = (limit: number = 10, offset: number = 0) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.DISHES, limit, offset],
    queryFn: () => dishService.getDishes(limit, offset),
    staleTime: 30000, // 30 seconds
    gcTime: 300000, // 5 minutes
  });
};

export const useToggleDishStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dishId: string) => dishService.toggleDishStatus(dishId),
    onMutate: async (dishId: string) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.DISHES });
      const previousDishes = queryClient.getQueriesData({
        queryKey: QUERY_KEYS.DISHES,
      });
      queryClient.setQueriesData(
        { queryKey: QUERY_KEYS.DISHES },
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            dishes: old.dishes.map((dish: Dish) =>
              dish.dishId === dishId
                ? { ...dish, isPublished: !dish.isPublished }
                : dish
            ),
          };
        }
      );

      return { previousDishes };
    },
    onError: (err, dishId, context) => {
      if (context?.previousDishes) {
        context.previousDishes.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DISHES });
    },
  });
};
