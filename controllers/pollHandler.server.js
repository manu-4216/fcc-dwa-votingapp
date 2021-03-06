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
 		Polls.remove({ _id: mongoose.mongo.ObjectId(req.params.id) })
         .then(function (result) {
             res.send('ok');
         })
         .catch(function (err) {
             res.send(err)
         })
 	}


	/**
    * Handles the request of getting the list of polls of a logged user.
    * @param  {Object} req - The request received
	* @param  {Object} res - The response to send
    */
	this.getAllUserPolls = function (req, res) {
		Polls.find({ author: req.user.username })
        .then(function (result) {
        	res.send(result)
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
        Polls.find({})
        .then(function (result) {
            res.send(result)
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
        var answerIndex = req.body.answerIndex,
            customOption = req.body.customOption;

        Polls.findById(req.body.pollId)
        .then(function (poll) {
            // Increment votes
            if (answerIndex < poll.options.length) {
                poll.votes[answerIndex] += 1;
            }
            // Add a new option
            if (answerIndex ===  poll.options.length && customOption) {
                poll.options.push(customOption);
                poll.markModified('options');
                poll.votes.push(1);
            }
            poll.markModified('votes');
            poll.save(function(err, savedPoll) {
                if (err) {
                    console.log('error ', err);
                    res.send(err);
                } else {
                    res.send(savedPoll.votes);
                }
            })
        })
        .catch(function (err) {
            res.send(err)
        })

        // update poll wih new option if needed. And inc vote
    }

}

module.exports = PollHandler;
