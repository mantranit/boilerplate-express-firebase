import express from "express";
import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

import { createServer } from "http";
import path from "path";
import "reflect-metadata";
import { Server } from "socket.io";

import application from "./application";
import Logger from "./utils/logger";
import config from "./utils/config";

const { instance: app } = application;

app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

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
  Logger.debug(`Server is listening on :${config.port}`);
});

app.locals.io = io;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.projectId,
    clientEmail: config.clientEmail,
    privateKey: config.privateKey,
  } as ServiceAccount),
});

app.locals.admin = admin;
