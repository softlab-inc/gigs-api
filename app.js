const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('./models');


const {ApolloServer} = require('apollo-server-express');


const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:{models}
});
dd
const app = express();

server.applyMiddleware({app,path:'/gigs-app/api/v1'});

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads/profile-photos/')));
app.use(express.static(path.join(__dirname, 'uploads/documents/')));

module.exports = {app,server};
