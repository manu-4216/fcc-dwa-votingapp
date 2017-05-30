var React = require('react');
var ReactDOM = require('react-dom');
var AnswerPoll = require('./answer-poll/containers/AnswerPoll');
//require('./main.scss');

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

  <AnswerPoll poll={poll} />,
  document.getElementById('app-poll')
);
