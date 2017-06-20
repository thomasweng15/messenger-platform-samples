const 
  api = require('./api'),
  config = require('config');

const SERVER_URL = (process.env.SERVER_URL) ?
  (process.env.SERVER_URL) :
  config.get('serverURL');

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

  api.callMessagesAPI(messageData);
}

const setReminderMessage = {
  type: 'web_url',
  title: 'Set Reminder',
  url: `${SERVER_URL}/`,
  webview_height_ratio: 'tall',
  messenger_extensions: true,
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
          buttons:[setReminderMessage]
        }
      }
    }
  };  

  api.callMessagesAPI(messageData);
}

module.exports = {
  sendTextMessage,
  sendButtonMessage
};