import { io } from "socket.io-client";
import { App } from "vue";

export const setupSocket = (app: App<Element>, { connection, options }) => {
  const socket = io(connection, options);
  app.config.globalProperties.$socket = socket;
  app.provide("socket", socket);
};
