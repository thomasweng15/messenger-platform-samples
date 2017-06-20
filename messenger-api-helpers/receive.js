const 
    axios = require('axios'),
    sendApi = require('./send');

/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message' 
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 * For this example, we're going to echo any text that we get. If we get some 
 * special keywords ('button', 'generic', 'receipt'), then we'll send back
 * examples of those bubbles to illustrate the special message bubbles we've 
 * created. If we receive a message with an attachment (image, video, audio), 
 * then we'll simply confirm that we've received the attachment.
 * 
 */
function receivedMessage(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  if (isEcho) {
    // Just logging message echoes to console
    console.log("Received echo for message %s and app %d with metadata %s", 
      messageId, appId, metadata);
    return;
  } else if (quickReply) {
    var quickReplyPayload = quickReply.payload;
    console.log("Quick reply for message %s with payload %s",
      messageId, quickReplyPayload);

    sendApi.sendTextMessage(senderID, "Quick reply tapped");
    return;
  }

  if (messageText) {

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      case 'reminder':
        setReminderAndConfirm(senderID, messageText);
        break;

      default:
        sendApi.sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendApi.sendTextMessage(senderID, "Message with attachment received");
  }
}

/*
 * Send a reminder message using the Send API.
 *
 */
function setReminderAndConfirm(recipientId, messageText) {
  axios.post('https://reminderapi.herokuapp.com/api/reminders', {
    user_id: recipientId,
    message: "Wake up sheeple!",
    next_reminder: new Date().getTime().toString(),
    frequency: "86400000"
  })
  .then(function (response) {
    sendApi.sendTextMessage(recipientId, "Set reminder succeeded.");
  })
  .catch(function (err) {
      console.log(err);
      sendApi.sendTextMessage(recipientId, "Set reminder failed.");
  });
}

function receivedReminderToSend(data) {
    const user_id = data.user_id;
    const message = data.message;
    console.log("Sending reminder to %s: %s", user_id, message);
    sendApi.sendTextMessage(user_id, message);
}

module.exports = {
  receivedMessage,
  receivedReminderToSend
};