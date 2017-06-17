////'use strict';

//var GitHubStrategy = require('passport-github').Strategy;
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/users');

module.exports = function (passport) {
    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};
