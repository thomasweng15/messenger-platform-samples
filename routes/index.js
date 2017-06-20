const
  express = require('express'),
  router = express.Router();

// GET home page for the application
router.get('/', (_, res) => {
  res.render('./index', {demo: process.env.DEMO, title: 'Reminders'});
});
 
module.exports = router;