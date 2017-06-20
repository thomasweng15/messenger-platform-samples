const api = require('./api');

/*
 * Send a text message using the Send API.
 *
 */
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText,
      metadata: "DEVELOPER_DEFINED_METADATA"
    }
  };

  api.callSendAPI(messageData);
}

/*
 * Send a button message using the Send API.
 *
 */
function sendButtonMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Set a reminder",
          buttons:[{
            type: "postback",
            title: "Set a reminder",
            payload: "DEVELOPER_DEFINED_PAYLOAD"
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

module.exports = {
  sendTextMessage,
  sendButtonMessage
};