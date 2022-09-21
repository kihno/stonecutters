const Message = require('../models/message');

exports.message_list = (req, res, next) => {
    res.send('message list');
};

exports.message_create_get = (req, res, next) => {
  res.send('create message');
};

exports.message_create_post = (req, res, next) => {
  res.send('send message');
};

exports.message_detail = (req, res, next) => {
  res.send('single message page');
};