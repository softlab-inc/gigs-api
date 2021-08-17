const { Expo } = require("expo-server-sdk");

const expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

// This service is responsible for sending pushNotifications to the subscribed users
class NotificationService {
  // creating messages you want to send to the clients
  // checking if all notification Appeal to be valide
  // construct a message to be sent
  // Align all notification into one chunck and to be sent and notification with similar content shall be compressed
  // send the chunk at once

  generateAcceptedMessages (data) {
    const messages = [];

    for (const accepted of data) {
      if (accepted.pushToken == null) continue;

      if (!Expo.isExpoPushToken(accepted.pushToken)) {
        console.error(
          `Push token ${accepted.pushToken} is not a valid Expo push token`
        );
        continue;
      }

      messages.push({
        to: accepted.pushToken,
        sound: "default",
        title: "GiG Accepted",
        body: `${accepted.fullName} has accepted to the GiG you created`,
        data: { gigId: accepted.gigId, toScreen: "Notifications" },
        priority: "high"
      });
    }

    return messages;
  }

  generateHiredMessages (data) {
    const messages = [];

    for (const hired of data) {
      if (hired.pushToken == null) continue;

      if (!Expo.isExpoPushToken(hired.pushToken)) {
        console.error(
          `Push token ${hired.pushToken} is not a valid Expo push token`
        );
        continue;
      }

      messages.push({
        to: hired.pushToken,
        sound: "default",
        title: "You are hired",
        body: `Dear ${hired.fullName} you have been hired for ${hired.name} GiG`,
        data: { gigId: hired.gigId, toScreen: "Gigs" },
        priority: "high"
      });
    }

    return messages;
  }

  generateMessages (employees) {
    const messages = [];

    for (const employee of employees) {
      if (employee.pushToken == null) continue;

      if (!Expo.isExpoPushToken(employee.pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      messages.push({
        to: employee.pushToken,
        sound: "default",
        title: "GiG created",
        body: `${employee.name}  -   ${employee.details}`,
        data: { gigId: employee.gigId, toScreen: "Notifications" },
        priority: "high"
      });
    }

    return messages;
  }

  async createChunckOfNotifications (messages) {
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];
    console.log({ chunks });
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }

    return tickets;
  }
}

module.exports = NotificationService;
