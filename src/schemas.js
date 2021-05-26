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
    pushToken:String
    hasProfession:[Profession!]
    hasNotifications:[Notification!]
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
    createdAt:DateTime
    updatedAt:DateTime
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
  days:Int
  hourlyRate:Float
  status:Int
  hoursPerDay:Int
  location:String
  assignedTo:JobSeeker
  createdAt:DateTime
  updatedAt:DateTime
}
  
fragment infor on JobSeeker {
  email
}

type Notification{
    status:Int!
    gig:Gig
    isRead:Int
    createdAt:DateTime
    updatedAt:DateTime
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
  notifications:[Notification!]
  readNotifications:[Notification!]
  unReadNotifications:[Notification!]
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
    status:Int
    professionId:Int!
    other:String!
    days:Int!
    location:String!
    hoursPerDay:Int!
    hourlyRate:Int!
 }

 #Mutations 
  type Mutation{
  createJobSeeker(input:CreateJobSeekerInput):String!
  signInJobSeeker(input:SignInJobSeeker):String!
  jobSeekerUploadProfileImage(profileImage:Upload!):String
  jobSeekerUpdatePushNotification(pushToken:String):String!

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




