const 
    api = require('./api'),
    config = require('config');

const SERVER_URL = (process.env.SERVER_URL) ?
  (process.env.SERVER_URL) :
  config.get('serverURL');

/**
 * Adds the server url to the Messenger App's whitelist.
 *
 * This is required to use Messenger Extensions which
 * this demo uses to get UserId's from a Messenger WebView.
 *
 * @returns {undefined}
 */
const domainWhitelisting = () => {
  api.callThreadAPI(
    {
      setting_type: 'domain_whitelisting',
      whitelisted_domains: [SERVER_URL],
      domain_action_type: 'add',
    },
    {
      setting_type: 'domain_whitelisting'
    }
  );
};

module.exports = {
    domainWhitelisting
};