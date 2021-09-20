const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const models = require("./models");
const cors = require("cors");
const helmet = require("helmet");
const Bottle = require("bottlejs");
const { ApolloServer } = require("apollo-server-express");
const { PubSub } = require("graphql-subscriptions");
require("dotenv").config();
const getUser = require("./utils/getUser");
const Cryptr = require("cryptr");
const AppServices = require("./services");
// updating the maximum number  of event listners from 10 - 100
require("events").EventEmitter.prototype._maxListeners = 100;
const cryptr = new Cryptr(process.env.JWT_SECRETE);
// Constructing a schema, using the GraphGL schema query language
const typeDefs = require("./schemas");
// Providing a resolver to the schema fields
const resolvers = require("./resolvers");
//bottle is a dependence inject jabascript library that is going to inject services
const bottle = new Bottle();

//registering services to bottle a DI library
bottle.factory('JobSeekerService',()=> new AppServices.JobSeekerSerivce(models));
bottle.factory('EmployerService',()=> new AppServices.EmployerService(models));
bottle.factory('GigService',()=> new AppServices.GigService(models));
bottle.service('NotificationService',AppServices.NotificationService);
bottle.service('MailerService',AppServices.MailerService);
bottle.service('AWS3Service',AppServices.AWS3Service);

console.log({bottle})

const services = bottle.container;


const pubsub = new PubSub();


/**
 * Integrating the APOLLO_SERVER to server our Graph GL API
 * Expossed through the context from on point of truth
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, connection }) => {
    if (connection) {
      return { connection, pubsub, models };
    } else {
      const token = req.headers.authorization || "";

      const user = getUser(token);

      return { models, user, pubsub, cryptr,services,models };
    }
  },
  subscriptions: {
    path: "/subscriptions",
    onConnect: (connectionParams, webSocket, context) => {
      console.log("Client connected");
    },
    onDisconnect: (webSocket, context) => {
      console.log("Client disconnected");
    },
  },
});

const app = express();

// Applying Apollo  Graph GL middleware and setting the path
server.applyMiddleware({
  app,
  path: "/gigs-app/api/v1",
  cors: { origin: true, credentials: true },
  bodyParserConfig: {
    limit: "50mb",
  },
});

/**
 * Setting up the middlewares of express server
 */

app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", parameterLimit: 100000, extended: true })
);
app.use(logger("dev"));
app.use(cookieParser());
app.use(cors());
app.use(helmet());



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// All other requests are not implemented
app.use((err, req, res, next) => {
  res.status(err.status || 400);
  res.json({
    error: {
      code: err.status || 400,
      message: err,
    },
  });
  next(res);
});

// If here then the request has not be found
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

module.exports = { app, server };
