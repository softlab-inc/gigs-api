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
    hasProfession:[Profession!]
    pendingGigs:[Gig!]
    completeGigs:[Gig!]
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
  paymentMethod:Int!
  budget:Float
  duration:Int
  hourlyRate:Float
  status:Int!
  assignedTo:JobSeeker
  updatedAt:String!
  createdAt:String!
}
  
fragment infor on JobSeeker {
  email
}

type Notification{
   gig:Gig
}

type Profession{
    id:Int!
    name:String!
}


  #Queries
  type Query{
  jobSeeker:JobSeeker
  employer:Employer
  gig:Gig
  employers:[Employer!]
  jobSeekers:[JobSeeker!]
  professions:[Profession!]
  gigs:[Gig!]
  notifications:[]
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

 input EmployerCreateGigInput{
    name:String!
    details:String!
    paymentMethod:Int!
    budget:Float!
    duration:Int
    hourlyRate:Float
    status:Int
    professionId:Int!
 }

 #Mutations 
  type Mutation{
  createJobSeeker(input:CreateJobSeekerInput):String!
  signInJobSeeker(input:SignInJobSeeker):String!
  jobSeekerUploadProfileImage(profileImage:Upload!):String

  createProfession(input:CreateProfession):String!

  userUpdateStatus(status:Int!):JobSeeker
 
  createEmployer(input:CreateEmployerInput):String
  signInEmployer(input:SignInEmployerInput):String!

  employerCreateGig(input:EmployerCreateGigInput):Gig
}

#Subscriptions
type Subscription{
  onGigCreated(token:String!):Gig!
  onStatusChange:JobSeeker!
}

  `;




