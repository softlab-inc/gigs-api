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

[
{name:"Accounting"},
{name:"Administration"},
{name:"Acting "},
{name:"Aviation"},
{name:"Aeronautics"},
{name:"Back-End Developer"},
{name:"Branding"},
{name:"Carpenter"},
{name:"Chef"},
{name:"Copyright "},
{name:"Customer Service "},
{name:"Decorator "},
{name:"Executive Assistant"},
{name:"Event organizer"},
{name:"Financial Analyst"},
{name:"Front-End Developer"},
{name:"Full-Stack Engineer"},
{name:"Graphic Designer"},
{name:"Marketing "},
{name:"Musician "},
{name:"Office Management"},
{name:"Product Manager"},
{name:"Project Manager"},
{name:"Proposal Writing "},
{name:"Photography"},
{name:"Public speaking"},
{name:"Salesperson"},
{name:"Teaching "},
{name:"Training"},
{name:"Web Developer"},
{name:"Other "},
]
