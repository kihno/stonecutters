var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('message list');
});

router.get('/create', function(req, res, next) {
  res.send('create message');
});

router.post('/create', function(req, res, next) {
  res.send('send message');
});

router.get('/message/:id', function(req, res, next) {
  res.send('single message page');
});

module.exports = router;