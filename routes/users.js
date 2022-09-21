var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', user_controller.user_list);

router.get('/secret', user_controller.user_secret_get);

router.post('/secret', user_controller.user_secret_post);

router.get('/sign-up', user_controller.user_create_get);

router.post('/sign-up', user_controller.user_create_post);

router.get('/log-in', user_controller.user_login_get);

router.post('/log-in', user_controller.user_login_post);

router.get('/log-out', user_controller.user_logout_get);

router.get('/:id', user_controller.user_detail);

module.exports = router;
