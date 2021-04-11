  const {gql} = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  #Types
  type JobSeeker{
    id:Int
    fullName:String
    bio:String
    email:String
    phone:String
    profileImage:String
    documents:String
    nationalId:String
    status:Int
    createdAt:DateTime
    updatedAt:DateTime
  }

  #Queries
  type Query{
   test:String

 }

 #InputFields
 input CreateJobSeekerInput{
   fullName:String!
    bio:String
    email:String!
    phone:String!
    profileImage:String
    documents:Upload!
    nationalId:Upload!
 }

 #Mutations 
  type Mutation{
  test(value:String):String
  createJobSeeker(input:CreateJobSeekerInput):JobSeeker

}
  `;
