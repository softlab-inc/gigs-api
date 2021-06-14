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
    readNotifications:[Notification!]
    unReadNotifications:[Notification!]
    pendingGigs:[Gig!]
    completeGigs:[Gig!]
    createdAt:DateTime
    updatedAt:DateTime
  }

  type Chat{
    id:Int!
    content:String!
    jobSeeker:JobSeeker
    employer:Employer
    createdAt:DateTime!
    updatedAt:DateTime!
  }

  type Employer{
    id:Int!
    fullName:String
    companyName:String
    email:String
    phone:String
    password:String
    pushToken:String
    createdAt:DateTime
    updatedAt:DateTime
    licenseImageUri:String
    hasAccepted:[Accepted!]
    recentHires:[JobSeeker!]
    unReadHasAccepted:[Accepted!]
  }

type Location{
  id:Int!
  logitude:String
  latitude:String
}


type Accepted{
  id:Int!
  pushToken:String!
  fullName:String!
  isRead:String!
  employee:JobSeeker
  employer:Employer
  gig:Gig
  createdAt:DateTime!
  updatedAt:DateTime!
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
  assignedTo:[JobSeeker]
  profession:Profession
  createdBy:Employer
  createdAt:DateTime
  updatedAt:DateTime
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
  employers:[Employer!]
  jobSeekers:[JobSeeker!]
  professions:[Profession!]
  gig:Gig
  createdGigs:[Gig!]
  employerChats(employeeId:Int!):[Chat!]
  jobSeekerChats(employerId:Int!):[Chat!]
  # notifications:[Notification!]
  # readNotifications:[Notification!]
  # unReadNotifications:[Notification!]
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

  jobSeekerUploadProfileImage(profileImage:Upload!):JobSeeker

  jobSeekerUpdatePushNotification(pushToken:String):JobSeeker

  employerUpdatePushNotification(pushToken:String):Employer

  createProfession(input:CreateProfession):String!

  userUpdateStatus(status:Int!):JobSeeker
 
  createEmployer(input:CreateEmployerInput):String!

  signInEmployer(input:SignInEmployerInput):String!

  employerCreateGig(input:EmployerCreateGigInput):Gig

  jobSeekerSendMessage(content:String!,employerId:Int!):Chat

  employerSendMessage(content:String!,employeeId:Int!):Chat

  sendEmail(email:String!):String!

  gigAccepted(employerId:Int!,fullName:String!,gigId:Int!):Accepted

  uploadFiletoS3(file:Upload):String

  jobSeekerUpdateData(phone:String,bio:String):JobSeeker

  testSubScription(token:String!):String!

  employerHireJobSeeker(gigId:Int,employeeId:Int!):Gig
}

#Subscriptions
type Subscription{
  onGigCreated(token:String!):Gig!
  onAcceptGig(token:String!):Accepted!
  onStatusChange:JobSeeker!
  onJobSeekerSentMessage(token:String!):Chat!
  onEmployerSentMessage(token:String!):Chat!
  onTestSubscription(token:String!):String!
  onJobSeekerHired(token:String!):Gig!
}

`;




