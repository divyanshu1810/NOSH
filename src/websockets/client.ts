import { WebSocket } from "ws";
import { clients } from "../app";
import { Dish } from "../dao/dish";

export function broadcastToClients(message: { type: string; data: Dish }) {
  const messageString = JSON.stringify({
    ...message,
    timestamp: new Date().toISOString(),
  });

  (clients as Set<WebSocket>).forEach((client: WebSocket) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(messageString);
      } catch (error) {
        console.error("❌ Error sending message to client:", error);
        clients.delete(client);
      }
    }
  });

  console.log(
    `📢 Broadcasted message to ${clients.size} clients:`,
    message.type
  );
}
