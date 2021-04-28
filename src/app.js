const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('./models');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const JWT_SECRETE = require('./utils/tokens');
const { ApolloServer} = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const {PubSub }= require('graphql-subscriptions')


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
      console.log(connection.context)
      return {connection,pubsub};
    }else{
      const token = req.headers.authorization || '';
      console.log(req.headers.authorization)
      const user = getUser(token);
      console.log('====================================');
      console.log({user});
      console.log('====================================');
    
    return {models,user,pubsub}
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
server.applyMiddleware({ app, path: '/gigs-app/api/v1' });


/**
 * Setting up the middlewares of express server 
 */
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

/**
 * Exporsing static files where all uploads shall be stored
 */
app.use(express.static(path.join(__dirname, 'uploads/profile-photos/')));
app.use(express.static(path.join(__dirname, 'uploads/documents/')));


/**
 * 
 * @param {*} token static token used to autheticate the user
 * @returns 
 */
const getUser = token => {
  console.log({token})
  if(token){
    try {
    return jwt.verify(token,JWT_SECRETE);
  }catch (error) {
    throw new Error('Invalid Session');
  }
  }
};

module.exports = {app,server};
