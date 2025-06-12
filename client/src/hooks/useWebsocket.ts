import { useEffect, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { websocketService, WebSocketMessage } from '../services/websocket';
import { QUERY_KEYS } from './useDishes';
import { Dish, DishesResponse } from '../types';

interface UseWebSocketReturn {
  connectionState: string;
  isConnected: boolean;
  lastMessage: WebSocketMessage | null;
  connect: () => void;
  disconnect: () => void;
}

export const useWebSocket = (): UseWebSocketReturn => {
  const [connectionState, setConnectionState] = useState<string>('DISCONNECTED');
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const queryClient = useQueryClient();

  const handleMessage = useCallback((message: WebSocketMessage) => {
    console.log('📨 Received WebSocket message:', message);
    setLastMessage(message);

    switch (message.type) {
      case 'CONNECTION_ESTABLISHED':
        queryClient.setQueriesData<DishesResponse>(
          { queryKey: QUERY_KEYS.DISHES },
          (oldData) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              dishes: message.data.dishes || oldData.dishes,
            };
          }
        );
        break;
      case 'DISH_UPDATED':
        queryClient.setQueriesData<DishesResponse>(
          { queryKey: QUERY_KEYS.DISHES },
          (oldData) => {
            if (!oldData) return oldData;

            return {
              ...oldData,
              dishes: oldData.dishes.map((dish: Dish) =>
                dish.dishId === message.data.dishId
                  ? { 
                      ...dish, 
                      ...(message.data.dishName && { dishName: message.data.dishName }),
                      ...(message.data.imageUrl && { imageUrl: message.data.imageUrl }),
                      ...(message.data.isPublished !== undefined && { isPublished: message.data.isPublished })
                    }
                  : dish
              ),
            };
          }
        );
        break;

      default:
        console.warn('🤷‍♂️ Unknown WebSocket message type:', message.type);
    }
  }, [queryClient]);

  useEffect(() => {
    const checkConnectionState = () => {
      setConnectionState(websocketService.getConnectionState());
    };

    const interval = setInterval(checkConnectionState, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const removeListener = websocketService.addListener(handleMessage);
    return () => {
      removeListener();
    };
  }, [handleMessage]);

  const connect = useCallback(() => {
    websocketService.connect();
  }, []);

  const disconnect = useCallback(() => {
    websocketService.disconnect();
  }, []);

  return {
    connectionState,
    isConnected: connectionState === 'CONNECTED',
    lastMessage,
    connect,
    disconnect,
  };
};