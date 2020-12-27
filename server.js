var express = require('express');
var routes = require('./routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();
require('dotenv').load();
require('./config/passport')(passport);
app.set('port', process.env.PORT || 3000);

// Configure the db:
console.log(process.env.DB_URI);
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Use body parser:
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//app.use(express.static(process.cwd()+ '/public'));
app.use('/', express.static(process.cwd() + '/'));
app.use('/poll', express.static(process.cwd() + '/'));

// Middleware for logging all the requests:
function logger(req, res, next) {
  console.log(req.method + ' : ' + req.originalUrl);
  next();
}
app.use(logger);

app.use(
  session({
    secret: 'sesame',
    resave: false,
    saveUninitialized: true,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = app.get('port');
app.listen(port, function () {
  console.log('Node.js listening on port ' + port + '...');
});
