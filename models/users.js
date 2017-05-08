//'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportEmail = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

// Passport-Email will add a username, email, hash and salt fields
var User = new Schema({});

User.plugin(passportLocalMongoose);

//User.plugin(passportEmail);

module.exports = mongoose.model('User', User);
