const { Expo } = require('expo-server-sdk');

// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

//This service is responsible for sending pushNotifications to the subscribed users
class GigService{
   
 
  //creating messages you want to send to the clients
  //checking if all notification Appeal to be valide
  //construct a message to be sent 
  //Align all notification into one chunck and to be sent and notification with similar content shall be compressed 
  //send the chunk at once 

  generateMessages(employeers) {


  }


  async createChunckOfNotifications(messages) {
    
    
  }



    
  


}