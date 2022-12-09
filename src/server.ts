import "reflect-metadata";
import { createServer } from "http";
import { Server } from "socket.io";

import application from "./application";
import Logger from "./utils/logger";
import config from "./utils/config";

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

httpServer.listen(config.port, () => {
  Logger.debug(`Server is listening on :${PORT}`);
});

app.locals.io = io;
