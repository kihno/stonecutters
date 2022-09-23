const express = require('express');
const router = express.Router();

const Message = require('../models/message');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/stonecutters');
});

router.get('/stonecutters', function(req, res, next) {
  Message.find().sort({ timestamp: -1 }).exec((err, results) => {
    if (err) { return next(err) }

    res.render('index', { title: 'Stonecutters', messages: results });
  });
});

module.exports = router;
