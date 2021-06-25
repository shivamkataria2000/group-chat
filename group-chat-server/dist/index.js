"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _mongoose = _interopRequireDefault(require("mongoose"));

require("./utils/db");

var _schema = _interopRequireDefault(require("./schema"));

var _expressJwt = _interopRequireDefault(require("express-jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const http = require("http");

// auth middleware
const auth = (0, _expressJwt.default)({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  algorithms: ["HS256"]
});
const app = (0, _express.default)();
app.use(auth);
const server = new _apolloServerExpress.ApolloServer({
  schema: _schema.default,
  cors: true,
  playground: process.env.NODE_ENV === "development" ? true : false,
  introspection: true,
  tracing: true,
  path: "/",
  subscriptions: {
    onConnect: async (connectionParams, webSocket) => {
      console.log("xxx");
      console.log(connectionParams);
    }
  },
  context: ({
    req,
    res
  }) => ({
    req,
    res
  })
});
const httpServer = http.createServer(app);
server.applyMiddleware({
  app,
  path: "/",
  cors: true,
  onHealthCheck: () => // eslint-disable-next-line no-undef
  new Promise((resolve, reject) => {
    if (_mongoose.default.connection.readyState > 0) {
      resolve();
    } else {
      reject();
    }
  })
});
server.installSubscriptionHandlers(httpServer);
httpServer.listen({
  port: process.env.PORT
}, () => {
  console.log(`🚀 Server listening on port ${process.env.PORT}`);
  console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`);
});