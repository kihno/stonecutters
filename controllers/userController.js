const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.user_list = (req, res, next) => {
    res.send('member list');
};

exports.user_detail = (req, res, next) => {
    res.send('member detail');
}

exports.user_create_get = (req, res, next) => {
    res.render('sign-up');
}

exports.user_create_post = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashPass) => {
        if (err) {
            return next(err)
        }
        const user = new User(
            {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hashPass
            }
        ).save(err => {
            if (err) {
                return next(err);
            }
            res.redirect('/messages');
        });
    });
}

exports.user_login_get = (req, res, next) => {
    res.render('log-in');
}

exports.user_login_post = passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: '/log-in'
});

exports.user_logout_get = (req, res, next) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}