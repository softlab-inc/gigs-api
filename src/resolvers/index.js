const Mutation = require('./mutation');
const Query = require('./query');
const { GraphQLDateTime } = require('graphql-iso-date');
const JobSeeker = require('./jobseeker');
const Subscription = require('./subscription');
const Notification = require('./notification');
const Chat = require('./chat');
const Gig = require('./gig');
const Employer = require('./employer');
const Accepted = require('./accepted');

/**
 * This module is responsible for exposing the Resolvers as Javascript objects
 */
module.exports={
  Mutation,
  Query,
  Subscription,
  JobSeeker,
  Notification,
  Chat,
  Gig,
  Employer,
  Accepted,
  DateTime:GraphQLDateTime, 
}


// [
// "Accounting", 
// "Administration", 
// "Acting ",
// "Aviation", 
// "Aeronautics",
// "Back-End Developer",
// "Branding",
// "Carpenter",
// "Chef",
// "Copyright ",
// "Customer Service ",
// "Decorator ",
// "Executive Assistant", 
// "Event organizer",
// "Financial Analyst", 
// "Front-End Developer", 
// "Full-Stack Engineer",
// "Graphic Designer",
// "Marketing ",
// "Musician ",
// "Office Management",
// "Product Manager",
// "Project Manager",
// "Proposal Writing ",
// "Photography",
// "Public speaking", 
// "Salesperson",
// "Teaching ",
// "Training", 
// "Web Developer",
// "Other "
// ]




