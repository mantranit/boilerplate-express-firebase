import "reflect-metadata";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import application from "./application";
import Logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 3000;

const { instance: app } = application;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  Logger.debug(`Socket.IO start with id: ${socket.id}`);
  socket.on("disconnect", (reason) => {
    Logger.debug(`Socket.IO end by ${reason}`);
  });
});

httpServer.listen(PORT, () => {
  Logger.debug(`Server is listening on :${PORT}`);
});

app.locals.io = io;
