//'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    author: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: [true, 'Poll question is mandatory']
    },
    options: {
        type: [String],
        validate: [arrayLimit, 'There needs to be at least 2 options']
    },
    votes: [Number],
    created: { 
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Poll', Poll);


function arrayLimit(val) {
  return val.length >= 2;
}