export interface WebSocketMessage {
  type: 'DISH_UPDATED' | 'CONNECTION_ESTABLISHED';
  data: {
    dishId: string;
    dishName?: string;
    imageUrl?: string;
    isPublished?: boolean;
    message?: string; // For CONNECTION_ESTABLISHED
    dishes?: Array<{
      dishId: string;
      dishName: string;
      imageUrl: string;
      isPublished: boolean;
    }>;
  };
  timestamp: string;
}

export type WebSocketEventHandler = (message: WebSocketMessage) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private listeners: Set<WebSocketEventHandler> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second
  private isManualClose = false;

  connect() {
    try {
      const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws';
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('✅ WebSocket connected');
        this.reconnectAttempts = 0;
        this.reconnectDelay = 1000;
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.notifyListeners(message);
        } catch (error) {
          console.error('❌ Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('🔌 WebSocket disconnected:', event.code, event.reason);
        this.ws = null;

        if (!this.isManualClose && this.reconnectAttempts < this.maxReconnectAttempts) {
          setTimeout(() => {
            this.reconnectAttempts++;
            console.log(`🔄 Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            this.connect();
          }, this.reconnectDelay);

          this.reconnectDelay = Math.min(this.reconnectDelay * 2, 30000);
        }
      };

      this.ws.onerror = (error) => {
        console.error('❌ WebSocket error:', error);
      };

    } catch (error) {
      console.error('❌ Failed to establish WebSocket connection:', error);
    }
  }

  disconnect() {
    this.isManualClose = true;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  addListener(handler: WebSocketEventHandler) {
    this.listeners.add(handler);
    return () => this.listeners.delete(handler);
  }

  private notifyListeners(message: WebSocketMessage) {
    this.listeners.forEach(listener => {
      try {
        listener(message);
      } catch (error) {
        console.error('❌ Error in WebSocket listener:', error);
      }
    });
  }

  isConnected() {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  getConnectionState() {
    if (!this.ws) return 'DISCONNECTED';
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING: return 'CONNECTING';
      case WebSocket.OPEN: return 'CONNECTED';
      case WebSocket.CLOSING: return 'CLOSING';
      case WebSocket.CLOSED: return 'DISCONNECTED';
      default: return 'UNKNOWN';
    }
  }
}

export const websocketService = new WebSocketService();