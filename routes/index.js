var path = process.cwd();
var User = require('../models/users.js');
var PollHandler = require('../controllers/pollHandler.server.js');

module.exports = function (app, passport) {
	//'use strict';

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			console.log('Is auth, next.');
			return next();
		} else {
			console.log('Is NOT auth, redirect login.');
			res.redirect('/');
		}
	}

	var pollHandler = new PollHandler();

	app.route('/poll/:id')
		.get(function(req, res) {
			console.log('route /poll/:id');
			console.log('Path ', path);
			res.sendFile(path + '/index.html');
		})

	app.route('/')
		.get(function(req, res) {
			console.log('route /');
			console.log('Path ', path);
			res.sendFile(path + '/index.html');
		})


	app.route('/checklogin')
		.get(function (req, res) {
			res.send({ logged: req.isAuthenticated() })
		})

	app.route('/login')
		.post(passport.authenticate('local'), function(req, res) {
			console.log(req.body);
			res.send({ logged: true });
		 })
		 .get(isLoggedIn, function(req, res) {
	 		console.log(req.body);
	 		res.redirect('/')
	 	 });

	app.route('/register')
		.post(function(req, res, next) {
		  console.log('registering user');
		  console.log(req.body);
		  var newUser = new User({ username: req.body.username });
		  User.register(newUser, req.body.password, function(err) {
			if (err) { console.log('error while user register!', err); return next(err); }
				passport.authenticate('local');
				console.log('user registered!');
				res.send({ logged: true });
		  });
		});


	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			console.log('logged out');
			res.send({ logged: false });
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/api/addpoll')
		.post(isLoggedIn, pollHandler.addPoll)


	app.route('/api/vote')
		.post(pollHandler.vote)
//////////////

	app.route('/api/poll/:id')
		.get(pollHandler.getPoll)
		.delete(pollHandler.deletePoll)

	app.route('/api/polls')
		.post(isLoggedIn, pollHandler.getAllPolls)

	app.route('/polls')
		.get(function(req, res) {
		   res.redirect('/')
		});

};
