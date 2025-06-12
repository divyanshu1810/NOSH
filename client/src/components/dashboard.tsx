import React, { useEffect } from 'react';
import { useDishes } from '../hooks/useDishes';
import { ConnectionStatus } from './ConnectionStatus';
import { useWebSocket } from '../hooks/useWebsocket';
import { DishCard } from './dishCard';
import { StatCard } from './statCard';

export const Dashboard: React.FC = () => {
  const { data, isLoading, error, refetch } = useDishes(10, 0);
  const { connect } = useWebSocket();

  useEffect(() => {
    connect();
  }, [connect]);

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
        <div className="header-top">
          <h1>🍽️ Dish Management Dashboard</h1>
          <ConnectionStatus />
        </div>
        <p>Manage your restaurant's dish catalog</p>
        <div className="stats">
          <StatCard number={dishes.length} label="Total Dishes" />
          <StatCard number={dishes.filter(dish => dish.isPublished).length} label="Published Dishes" />
          <StatCard number={dishes.filter(dish => !dish.isPublished).length} label="Draft Dishes" />
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