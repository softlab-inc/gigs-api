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

  type Employer{
    id:Int!
    fullName:String
    email:String
    phone:String
    password:String
    updatedAt:String
    createdAt:String
    licenseImageUri:String
    hasLocation:String
  }

type Location{
  id:Int!
  logitude:String
  latitude:String
}

type District{
 id:Int!
name:String
}

type Gig{
  id:Int!
  name:String!
  details:String
  budget:Float
  duration:String
  status:Int!
  updatedAt:String
  createdAt:String
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
  employer:Employer
  employers:[Employer]
  jobSeekers:[JobSeeker]
  professions:[Profession]
 }

 #InputFields
 input CreateJobSeekerInput{
   fullName:String!
    password:String!
    email:String!
    phone:String!
    document:Upload!
    nationalId:Upload!
    professionId:Int!
    other:String
 }

 input CreateEmployerInput{
    fullName:String!
    companyName:String!
    email:String!
    phone:String!
    password:String!
    license:Upload!
 }

 input CreateProfession{
   names:[String!]!
 }

 input SignInJobSeeker{
   email:String!
   password:String!
 }

 input SignInEmployerInput{
   email:String!
   password:String!
 }

 #Mutations 
  type Mutation{
  test(value:String):String
  createJobSeeker(input:CreateJobSeekerInput):String!
  createProfession(input:CreateProfession):String
  signInJobSeeker(input:SignInJobSeeker):String!
 
  userUpdateStatus(status:Int!):JobSeeker
  jobSeekerUploadProfileImage(profileImage:Upload!):String
  createEmployer(input:CreateEmployerInput):String
   signInEmployer(input:SignInEmployerInput):String!
}

#Subscriptions
type Subscription{
  hasTested:String
  onStatusChange:JobSeeker!
}

  `;




