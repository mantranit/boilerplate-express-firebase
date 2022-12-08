import "reflect-metadata";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import application from "./application";
import Logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 3000;

const httpServer = createServer(application.instance);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log(`Connected`)
  console.log(socket)
  socket.on("disconnect", (reason) => {
    console.log(`Disconnected ${reason}`)
  });
});

httpServer.listen(PORT, () => {
  Logger.debug(`Server is listening on :${PORT}`);
});
