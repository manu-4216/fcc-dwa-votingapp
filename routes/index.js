var path = process.cwd();
var User = require('../models/users.js');
var PollHandler = require('../controllers/pollHandler.server.js');

module.exports = function (app, passport) {
	//'use strict';

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}

	var pollHandler = new PollHandler();

	app.route('/poll/:id')
		.get(function(req, res) {
			res.sendFile(path + '/index.html');
		})

	app.route('/')
		.get(function(req, res) {
			res.sendFile(path + '/index.html');
		})


	app.route('/checklogin')
		.get(function (req, res) {
			res.send({ logged: req.isAuthenticated() })
		})

	app.route('/login')
		.post(passport.authenticate('local'), function(req, res) {
			res.send({ logged: true });
		 })
		 .get(isLoggedIn, function(req, res) {
	 		res.redirect('/')
	 	 });

	app.route('/register')
		.post(function(req, res, next) {
		  var newUser = new User({ username: req.body.username });
		  User.register(newUser, req.body.password, function(err) {
			if (err) { console.log('error while user register!', err); return next(err); }
				passport.authenticate('local');

				res.send({ logged: true });
		  });
		});


	app.route('/logout')
		.get(function (req, res) {
			req.logout();
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
		//.post(isLoggedIn, pollHandler.getAllPolls)
		.post(function(req, res) {
			console.log('The use is ' + req.isAuthenticated() ? '' : 'not' + ' authenticated');

			if (req.isAuthenticated()) {
				pollHandler.getAllUserPolls(req, res)
			} else {
				pollHandler.getAllPolls(req, res)
			}
		})

	app.route('/polls')
		.get(function(req, res) {
		   res.redirect('/')
		});

};
