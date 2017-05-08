////'use strict';

//var GitHubStrategy = require('passport-github').Strategy;
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {
    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

//    passport.use(new LocalStrategy({
    //        usernameField: 'email',
    //        passwordField: 'password',
    //        session: true,
    //        passReqToCallback : true
//        },
//        User.authenticate()));
};
