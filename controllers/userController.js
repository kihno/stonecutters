const async = require('async');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { body, check, validationResult } = require('express-validator');

const User = require('../models/user');
const Message = require('../models/message');

exports.user_list = (req, res, next) => {
    User.find()
    .sort({ sort: 1 })
    .exec(function(err, members) {
        if (err) { return next(err) }

        res.render('member-list', { members: members });
    });
};

exports.user_secret_get = (req, res, next) => {
    res.render('secret', { title: 'Members Only' });
};

exports.user_secret_post = [
    body('answer', 'You have guessed... poorly.')
    .trim()
    .isLength({ min:1 })
    .custom(val => {
        if (val.split(' ').join('').toLowerCase() === 'wedo') return true;
        return false;
    })
    .escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('secret', { title: 'Members Only', errors: errors.array() });
            return;
        } 

        res.render('sign-up', { title: 'Sign Up', worthy:true, });
    }
];

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

exports.user_create_get = (req, res, next) => {
    res.render('sign-up', { title: 'Sign Up' });
};

exports.user_create_post = [
    check('password').exists(),
    check(
        'passwordConfirm',
        'Confirm password field must match password field',
    )
    .exists()
    .custom((value, { req }) => value === req.body.password),

    (req, res, next) => {
        bcrypt.hash(req.body.password, 10, (err, hashPass) => {
            if (err) {
                return next(err)
            }
    
            const errors = validationResult(req);
    
            const user = new User(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    password: hashPass
                }
            )
    
            if(!errors.isEmpty()) {
                res.render('sign-up', { title: 'Sign Up', worthy:true, errors: errors.array() });
                return;
            } else {
                User.findOne({ username: req.body.username }).exec((err, found_user) => {
                    if (err) { return next(err) }
    
                    if (found_user) {
                        res.render('sign-up', { title: 'Sign Up', worthy:true, user:user, error: 'Username already exists.' });
                    } else {
                        user.save(err => {
                            if (err) {
                                return next(err);
                            }
                            res.render('success', { title: 'Member Log In', success:true });
                        });
                    }
                })
            }
        });
    }
];

exports.user_detail = (req, res, next) => {
    async.parallel(
        {
            member(callback) {
                User.findById(req.params.id).exec(callback);
            },
            member_posts(callback) {
                Message.find({ sender: req.params.id })
                .sort({ timestamp: -1 })
                .exec(callback);
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