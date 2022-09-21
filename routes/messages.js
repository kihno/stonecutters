var express = require('express');
var router = express.Router();

const message_controller = require('../controllers/messageController');

/* GET users listing. */
router.get('/', message_controller.message_list);

router.get('/create', message_controller.message_create_get);

router.post('/create', message_controller.message_create_post);

router.get('/message/:id', message_controller.message_detail);

module.exports = router;