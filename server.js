////'use strict';

var express = require('express');
var routes = require('./routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
require('dotenv').load();
require('./config/passport2')(passport);
app.set('port', process.env.PORT || 3000);

// Configure the db:
//mongoose.connect(process.env.MONGO_URI);
mongoose.connect(process.env.DB_URI);
//mongoose.connect("mongodb://127.0.0.1:27017/votingapp");
mongoose.Promise = global.Promise;

// Use body parser:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*
app.use('/controllers', express.static(process.cwd() + '/controllers'));
app.use('/common', express.static(process.cwd() + '/common'));
app.use('/', express.static(process.cwd() + '/'));
*/

//app.use('/dist', express.static(process.cwd() + '/dist'));
//app.use('/public', express.static(process.cwd() + '/public'));

//app.use(express.static(process.cwd()+ '/public'));
app.use('/', express.static(process.cwd() + '/'));
app.use('/poll', express.static(process.cwd() + '/'));

// Middleware for logging all the requests:
function logger (req, res, next) {
    console.log(req.method + ' : ' +  req.originalUrl);
    //console.log('req', req.body);
    next()
}
app.use(logger)


app.use(session({
	secret: 'sesame',
	resave: false,
	saveUninitialized: true
}));


// Passport
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = app.get('port');
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
