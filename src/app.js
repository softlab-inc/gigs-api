const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('./models');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const helmet = require('helmet');
const { ApolloServer} = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions')
require('dotenv').config();
const getUser = require('../src/utils/getUser');


//Constructing a schema, using the GraphGL schema query language
const typeDefs = require('./schemas');
//Providing a resolver to the schema fields
const resolvers = require('./resolvers');

//const pubsub = new PubSub();
const pubsub = new PubSub();


/**
 * Integrating the APOLLO_SERVER to server our Graph GL API
 * Expossed through the context from on point of truth 
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req,connection }) => {
    
    if (connection) {
      return {connection,pubsub,models};
    }else{
      const token = req.headers.authorization || '';

      const user = getUser(token);
      console.log('====================================');
      console.log({user});
      console.log('====================================');
    
      return { models, user, pubsub };
    }
    
  },
  subscriptions: {
    path: '/subscriptions',
    onConnect: (connectionParams, webSocket, context) => {
        console.log('Client connected');
    },
    onDisconnect: (webSocket, context) => {
      console.log('Client disconnected')
    },
  },
});



const app = express();

//Applying Apollo  Graph GL middleware and setting the path
server.applyMiddleware({ app, path: '/gigs-app/api/v1'});

/**
 * Setting up the middlewares of express server 
 */
app.use(express.json());
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());
app.use(helmet());


/**
 * Exporsing static files where all uploads shall be stored
 */
app.use(express.static(path.join(__dirname, '/uploads/profile-images/')));
app.use(express.static(path.join(__dirname, '/uploads/document-images/')));
app.use(express.static(path.join(__dirname, '/uploads/id-images/')));
app.use(express.static(path.join(__dirname, '/uploads/license-images/')));



module.exports = {app,server};
