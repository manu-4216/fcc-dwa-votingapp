var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./app/containers/App');
//require('./main.scss');
//var AnswerPoll = require('./answer-poll/containers/AnswerPoll');
//App = require('./answer-poll/containers/AnswerPoll');

var poll = {
    "author": "user",
    "question": "Favorite color?",
    "created": "2017-05-28T08:14:21.176Z",
    "options": [
        "Red",
        "Black"
    ],
    "votes": []
};

ReactDOM.render(

  <App poll={poll} />,
  document.getElementById('app')
);
