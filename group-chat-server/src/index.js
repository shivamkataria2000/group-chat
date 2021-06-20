import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
const http = require("http");

import mongoose from "mongoose";

import "./utils/db";
import schema from "./schema";
import jwt from "express-jwt";

// auth middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  algorithms: ["HS256"],
});
const app = express();
app.use(auth);
const server = new ApolloServer({
  schema,
  cors: true,
  playground: process.env.NODE_ENV === "development" ? true : false,
  introspection: true,
  tracing: true,
  path: "/",
  subscriptions: {
    onConnect: async (connectionParams, webSocket) => {
      console.log("xxx");
      console.log(connectionParams);
    },
  },
  context: ({ req, res }) => ({
    req,
    res,
  }),
});

const httpServer = http.createServer(app);

server.applyMiddleware({
  app,
  path: "/",
  cors: true,
  onHealthCheck: () =>
    // eslint-disable-next-line no-undef
    new Promise((resolve, reject) => {
      if (mongoose.connection.readyState > 0) {
        resolve();
      } else {
        reject();
      }
    }),
});

server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: process.env.PORT }, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}`);
  console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`
  );
});
