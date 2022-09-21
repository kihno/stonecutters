const async = require('async');
const User = require('../models/user');
const Message = require('../models/message');
const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.user_list = (req, res, next) => {
    User.find()
    .sort({ username: 1 })
    .exec(function(err, members) {
        if (err) { return next(err) }

        res.render('member-list', { members: members });
    });
};

exports.user_create_get = (req, res, next) => {
    res.render('sign-up', { title: 'Sign Up' });
};

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
};

exports.user_login_get = (req, res, next) => {
    res.render('log-in', { title: 'Member Log In' });
};

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
};

exports.user_detail = (req, res, next) => {
    async.parallel(
        {
            member(callback) {
                User.findById(req.params.id).exec(callback);
            },
            member_posts(callback) {
                Message.find({ sender: req.params.id }).exec(callback);
            },
        },
        (err, results) => {
            if (err) { console.log(err); return next(err); }

            if (results.member == null) {
                const err = new Error('Member not found.');
                err.stats = 404;
                return next(err);
            }

            res.render('member-detail', { title: 'Member', member: results.member, member_posts: results.member_posts });
        }
    );
};