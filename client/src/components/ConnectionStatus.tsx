import React from 'react';
import { useWebSocket } from '../hooks/useWebsocket';

export const ConnectionStatus: React.FC = () => {
  const { connectionState, isConnected, lastMessage, connect } = useWebSocket();

  const getStatusColor = () => {
    switch (connectionState) {
      case 'CONNECTED': return '#4ecdc4';
      case 'CONNECTING': return '#f39c12';
      case 'DISCONNECTED': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getStatusIcon = () => {
    switch (connectionState) {
      case 'CONNECTED': return '🟢';
      case 'CONNECTING': return '🟡';
      case 'DISCONNECTED': return '🔴';
      default: return '⚪';
    }
  };

  const formatLastUpdate = () => {
    if (!lastMessage) return 'No updates yet';
    
    const time = new Date(lastMessage.timestamp).toLocaleTimeString();
    const typeMap: Record<string, string> = {
      'DISH_UPDATED': 'Dish updated',
      'CONNECTION_ESTABLISHED': 'Connection established',
    };
    
    return `${typeMap[lastMessage.type] || 'Message received'} at ${time}`;
  };

  return (
    <div className="connection-status">
      <div className="connection-indicator">
        <span className="status-icon">{getStatusIcon()}</span>
        <div className="status-info">
          <span className="status-text" style={{ color: getStatusColor() }}>
            {connectionState}
            { " "}
          </span>
          <span className="last-update">{formatLastUpdate()}</span>
        </div>
      </div>
      
      {!isConnected && (
        <button 
          onClick={connect}
          className="reconnect-button"
          title="Reconnect to real-time updates"
        >
          🔄 Reconnect
        </button>
      )}
      
      {isConnected && (
        <div className="live-indicator">
          <span className="pulse-dot"></span>
          LIVE
        </div>
      )}
    </div>
  );
};