import React from 'react';
import { Dish } from '../types';
import { useToggleDishStatus } from '../hooks/useDishes';

interface DishCardProps {
  dish: Dish;
}

export const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const toggleMutation = useToggleDishStatus();

  const handleToggle = () => {
    toggleMutation.mutate(dish.dishId);
  };

  return (
    <div className="dish-card">
      <div className="dish-image-container">
        <img 
          src={dish.imageUrl} 
          alt={dish.dishName}
          className="dish-image"
          loading="lazy"
        />
        <div className={`status-badge ${dish.isPublished ? 'published' : 'unpublished'}`}>
          {dish.isPublished ? 'Published' : 'Unpublished'}
        </div>
      </div>
      
      <div className="dish-content">
        <h3 className="dish-name">{dish.dishName}</h3>
        <p className="dish-id">ID: {dish.dishId}</p>
        
        <button
          onClick={handleToggle}
          disabled={toggleMutation.isPending}
          className={`toggle-button ${dish.isPublished ? 'unpublish' : 'publish'}`}
        >
          {toggleMutation.isPending ? (
            <span className="loading-spinner"></span>
          ) : (
            dish.isPublished ? 'Unpublish' : 'Publish'
          )}
        </button>
      </div>
    </div>
  );
};