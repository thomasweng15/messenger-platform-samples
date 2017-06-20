const
  bodyParser = require('body-parser'),
  express = require('express'),
  receiveApi = require('../messenger-api-helpers/receive'),
  router = express.Router();

router.use(bodyParser.json());

router.post('/', function(req, res) {
  receiveApi.receivedReminderToSend(req.body);
  res.send();
});

module.exports = router;