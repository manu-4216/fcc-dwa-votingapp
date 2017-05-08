var React = require('react');
var moment = require('moment');


var formats = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'DD/MM/YYYY',
    lastDay: '[Yesterday]',
    lastWeek: 'DD/MM/YYYY',
    sameElse: 'DD/MM/YYYY'
}

const PollList = function(props) {
    return (
        <ul>

          { props.polls.map((poll, index) => (
            <li key={index}>
              <div> { poll.question } </div>
              <div>
                  <span> { moment(poll.created).calendar(new Date(), formats) } </span>
                  <span> { poll.votes } </span>
              </div>
            </li>
          ))}

        </ul>
    )
}

module.exports = PollList;
