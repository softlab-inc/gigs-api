  const {gql} = require('apollo-server-express');

module.exports = gql`
  scalar DateTime


  # User-defined Types
  type JobSeeker{
    id:Int!,
    fullName:String!,
    companyName:String!,
  }


  #Queries
  type Query{
   test:String
 }

 
#Mutations
  type Mutation{
  test(value:String):String

 #mutations for job-seeker
  
}


  `;
