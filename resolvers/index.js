const Mutation = require("./mutation");
const Query = require("./query");
const { GraphQLDateTime } = require("graphql-iso-date");
const JobSeeker = require("./jobseeker");
const Subscription = require("./subscription");
const Notification = require("./notification");
const Chat = require("./chat");
const Gig = require("./gig");
const Employer = require("./employer");
const Accepted = require("./accepted");
const Messages = require("./messages");

/**
 * This module is responsible for exposing the Resolvers as Javascript objects
 */
module.exports = {
  Mutation,
  Query,
  Subscription,
  JobSeeker,
  Notification,
  Chat,
  Gig,
  Employer,
  Accepted,
  Messages,
  DateTime: GraphQLDateTime,
};
