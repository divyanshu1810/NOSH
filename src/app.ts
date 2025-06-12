import createError from "http-errors";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import WebSocket from "ws";

dotenv.config({ path: path.join(__dirname, "../.env") });
import { handleError } from "./helpers/error";
import httpLogger from "./middlewares/httpLogger";
import router from "./routes/index";
import { initializeDatabase } from "./database/authenticate";
import { getAllDishes } from "./repo/dishRepo";

const app: express.Application = express();

app.use(cors());
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.use((_req, _res, next) => {
  next(createError(404));
});

const errorHandler: express.ErrorRequestHandler = (err, _req, res) => {
  handleError(err, res);
};
app.use(errorHandler);

const port = process.env.PORT || "8000";
app.set("port", port);

const server = http.createServer(app);

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      process.exit(1);
      break;
    case "EADDRINUSE":
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export const clients = new Set();

const wss = new WebSocket.Server({
  server,
  path: "/ws",
});

wss.on("connection", async (ws) => {
  console.log("🔌 New WebSocket connection established");

  clients.add(ws);

  ws.send(
    JSON.stringify({
      type: "CONNECTION_ESTABLISHED",
      data: {
        message: "Connected to real-time updates",
        dishes: await getAllDishes(10, 0),
      },
      timestamp: new Date().toISOString(),
    })
  );

  ws.on("close", () => {
    console.log("🔌 WebSocket connection closed");
    clients.delete(ws);
  });

  ws.on("error", (error) => {
    console.error("❌ WebSocket error:", error);
    clients.delete(ws);
  });

  const heartbeat = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    } else {
      clearInterval(heartbeat);
    }
  }, 30000);

  ws.on("pong", () => {
    console.log("💓 WebSocket heartbeat received");
  });
});

async function onListening() {
  await initializeDatabase();
  console.log("📊 Database synced successfully");
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  console.info(`Server is listening on ${bind}`);
}

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
