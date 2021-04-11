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
    hasProfession:[Profession]
    createdAt:DateTime
    updatedAt:DateTime
  }

  type Profession{
    id:Int!
    name:String!
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
    professionIds:[Int!]

 }

 #Mutations 
  type Mutation{
  test(value:String):String
  createJobSeeker(input:CreateJobSeekerInput):JobSeeker

}
  `;
