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