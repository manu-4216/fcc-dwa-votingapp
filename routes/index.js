var path = process.cwd();
var User = require('../models/users.js');
var ClickHandler = require('../controllers/clickHandler.server.js');
var PollHandler = require('../controllers/pollHandler.server.js');

module.exports = function (app, passport) {
	//'use strict';

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();

	app.route('/')
		.get(function(req, res) {
			console.log('route /');
			res.sendFile(path + '/index.html');
		})
//		.get(isLoggedIn, function (req, res) {
//			console.log('hello /', req.body);
			//res.sendFile(path + '/public/index.html');
//			res.sendFile(path + '/server/index.html');
//		});


	app.route('/checklogin')
		.get(function (req, res) {
			res.send({ logged: req.isAuthenticated() })
		})

	app.route('/login')
		.get(function (req, res) {
			//res.sendFile(path + '/public/login.html');
			//res.sendFile(path + '/server/login0.html');
			res.sendFile(path + '/login0.html');
		})
		.post(function(req, res, next) {
		  console.log('registering user');
		  console.log(req.body);
		  var newUser = new User({ username: req.body.username });
		  User.register(newUser, req.body.password, function(err) {
		    if (err) { console.log('error while user register!', err); return next(err); }

		    console.log('user registered!');

			res.send({ logged: true });
		    //res.redirect('/');
		  });
		});


	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);


	app.route('/api/:id/polls')
		//.get(isLoggedIn, pollHandler.getClicks)
		.post(isLoggedIn, pollHandler.addPoll)
		//.delete(isLoggedIn, pollHandler.resetClicks);

	app.route('/poll/:id')
		.get(pollHandler.getPoll)
		//.post(isLoggedIn, pollHandler.addPoll)
		//.delete(isLoggedIn, pollHandler.resetClicks);

	app.route('/polls')
		.get(isLoggedIn, pollHandler.getAllPolls)
		//.get(pollHandler.getAllPolls)


};
