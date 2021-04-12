const Mutation = require('./mutation');
const Query = require('./query');
const {GraphQLDateTime}  = require('graphql-iso-date')

/**
 * This module is responsible for exposion the Resolvers as Javascript objects
 */
module.exports={
  Mutation,
  Query,
  DateTime:GraphQLDateTime,
}


