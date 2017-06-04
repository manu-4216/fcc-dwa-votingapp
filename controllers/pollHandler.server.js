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
	        options: req.body.options.filter(item => (item !== '')),
            votes: req.body.options.filter(item => (item !== '')).map(item => 0)
	    });

	    newPoll.save(function (err, storedPoll) {
	    	var serverUrlBase = req.protocol + '://' + req.get('host')

	        if (err) {
	        	console.log('err', err)
	            return res.status(403).send(err)
	        }
	        var storedPollUrl = serverUrlBase + '/poll/' + storedPoll._id.toString();
	        res.status(200).send({
                url: storedPollUrl,
                _id: storedPoll._id.toString()
            })
	    })

	    /*
		Polls
			.find({ 'github.id': req.user.github.id }, { $inc: { 'nbrClicks.clicks': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }

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
     * Handles the request of deleting a poll from the DB.
     * @param  {Object} req - The request received
     * @param  {Object} res - The response to send
     */
     this.deletePoll = function (req, res) {
        console.log('BODY:', req.params);
        console.log(req.params.id);
 		Polls.remove({ _id: mongoose.mongo.ObjectId(req.params.id) })
         .then(function (result) {
             res.send('ok');
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


    /**
    * Handles the request of getting the info about a poll.
    * @param  {Object} req - The request received
    * @param  {Object} res - The response to send
    */
    this.getPoll = function (req, res) {
        console.log('pollId:', req.params.id);

        Polls.findById(req.params.id)
        .then(function (poll) {
        	res.send(poll);
        })
        .catch(function (err) {
            res.send(err)
        })
    }


    /**
    * Handles the request of voting for a poll.
    * @param  {Object} req - The request received
    * @param  {Object} res - The response to send
    */
    this.vote = function (req, res) {
        var answerIndex = req.body.answerIndex;

        console.log('vote:', req.body.answerIndex);

        Polls.findById(req.body.pollId)
        .then(function (poll) {
            poll.votes[answerIndex] += 1;
            poll.markModified('votes');
            poll.save(function(err, savedPoll) {
                if (err) {
                    console.log('error ', err);
                    res.send(err);
                }

                res.send(savedPoll.votes);
            })
        })
        .catch(function (err) {
            res.send(err)
        })

        // update poll wih new option if needed. And inc vote
    }

}

module.exports = PollHandler;
