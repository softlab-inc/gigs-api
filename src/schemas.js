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
    profileImagUri:String
    documentImageUri:String
    nationalIdImageUri:String
    status:Int
    hasProfession:[Profession]
    createdAt:DateTime
    updatedAt:DateTime
  }

  fragment infor on JobSeeker {
  email
}

  type Profession{
    id:Int!
    name:String!
  }

  #Queries
  type Query{
   test:String
   jobSeeker:JobSeeker
   jobSeekers:[JobSeeker]

 }

 #InputFields
 input CreateJobSeekerInput{
   fullName:String!
    password:String!
    email:String!
    phone:String!
    document:Upload!
    nationalId:Upload!
    professionIds:[Int!]!
 }

 input CreateProfession{
   names:[String!]!
 }

 input SignInJobSeeker{
   email:String!
   password:String!
 }

 #Mutations 
  type Mutation{
  test(value:String):String
  createJobSeeker(input:CreateJobSeekerInput):String!
  createProfession(input:CreateProfession):String
  signInJobSeeker(input:SignInJobSeeker):String!
}
  `;




