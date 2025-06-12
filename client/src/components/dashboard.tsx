import React from 'react';
import { useDishes } from '../hooks/useDishes';
import { DishCard } from './dishCard';

export const Dashboard: React.FC = () => {
  const { data, isLoading, error, refetch } = useDishes(10, 0);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner large"></div>
        <p>Loading dishes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Something went wrong</h2>
        <p>Failed to load dishes. Please try again.</p>
        <button onClick={() => refetch()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  const dishes = data?.dishes || [];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🍽️ Dish Management Dashboard</h1>
        <p>Manage your restaurant's dish catalog</p>
        <div className="stats">
          <div className="stat">
            <span className="stat-number">{dishes.length}</span>
            <span className="stat-label">Total Dishes</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {dishes.filter(dish => dish.isPublished).length}
            </span>
            <span className="stat-label">Published</span>
          </div>
          <div className="stat">
            <span className="stat-number">
              {dishes.filter(dish => !dish.isPublished).length}
            </span>
            <span className="stat-label">Unpublished</span>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {dishes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h2>No dishes found</h2>
            <p>Start by adding some delicious dishes to your menu!</p>
          </div>
        ) : (
          <div className="dishes-grid">
            {dishes.map((dish) => (
              <DishCard key={dish.dishId} dish={dish} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};