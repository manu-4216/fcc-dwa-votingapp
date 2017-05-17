//'use strict';

var Polls = require('../models/polls.js');
var mongoose = require('mongoose');

function PollHandler () {


   /**
    * Handles the request of adding a poll to the DB.
    * @param  {Object} req - The request received
	* @param  {Object} res - The response to send
    */
	this.addPoll = function (req, res) {
	    var newPoll = new Polls({
	    	author: req.user.username,
	        question: req.body.question,
	        options: req.body.options.filter(item => (item !== ''))
	    });

	    newPoll.save(function (err, storedPoll) {
	    	var serverUrlBase = req.protocol + '://' + req.get('host')

	        if (err) {
	        	console.log('err', err)
	            return res.status(403).send(err)
	        }
	        var storedPollUrl = serverUrlBase + '/poll/' + storedPoll._id.toString();
	        res.status(200).send(storedPollUrl);
	    })

	    /*
		Polls
			.find({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

					res.json(result.nbrClicks);
				}
			);
			*/
	};


   /**
    * Handles the request of getting a poll from the DB.
    * @param  {Object} req - The request received
	* @param  {Object} res - The response to send
    */
	this.getPoll = function (req, res) {
		var queryId = new mongoose.mongo.ObjectId(req.params.id)

		Polls.findOne({ _id: queryId })
        .then(function (result) {
            res.send({
            	author: result.author,
                question: result.question,
                created: result.created,
                options: result.options,
                votes: result.votes
            })
        })
        .catch(function (err) {
            res.send(err)
        })
	}


	 /**
    * Handles the request of getting the list of polls.
    * @param  {Object} req - The request received
	* @param  {Object} res - The response to send
    */
	this.getAllPolls = function (req, res) {
        console.log('user', req.user);
		Polls.find({ author: req.user.username })
        .then(function (result) {
            console.log('Inside getAllPolls')
        	res.send(result)
            /* res.send({
            	author: result.author,
                question: result.question,
                created: result.created,
                options: result.options,
                votes: result.votes
            })*/
        })
        .catch(function (err) {
            res.send(err)
        })
	}

}

module.exports = PollHandler;
