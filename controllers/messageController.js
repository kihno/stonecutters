const { body, validationResult } = require('express-validator');
const Message = require('../models/message');

exports.message_list = (req, res, next) => {
  Message.find()
  .sort({ timestamp: 1 })
  .populate('sender')
  .exec(function(err, list_messages) {
    if (err) { return next(err) }

    res.render('messages', { title: 'Messages', user: req.user, messages: list_messages });
  });
};

exports.message_create_get = (req, res, next) => {
  res.render('message-form', { title: 'Create Message', user: req.user });
};

exports.message_create_post = [
  body('message', 'Message must have text')
  .trim()
  .isLength({ min:1 })
  .escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message(
      {
        text: req.body.message,
        timestamp: new Date(),
        sender: req.user,
      }
    );

    if (!errors.isEmpty()) {
      console.log(errors);
      res.render('message-form', { title: 'Create Message', errors: errors.array()});
      return;
    }

    message.save((err) => {
      if (err) { return next(err) }

      res.render('/messages');
    });
  }
];

exports.message_detail = (req, res, next) => {
  res.send('single message page');
};