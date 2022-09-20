var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('member list');
});

router.get('/sign-up', function(req, res, next) {
  res.send('sign up form');
});

router.post('/sign-up', function(req, res, next) {
  res.send('submit sign up form');
});

router.get('/log-in', function(req, res, next) {
  res.send('log in');
});

router.post('/log-out', function(req, res, next) {
  res.send('submit log in');
});

module.exports = router;
