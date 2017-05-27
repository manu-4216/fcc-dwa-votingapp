var React = require('react');
var moment = require('moment');

require('../style/main.scss');

var formats = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'DD/MM/YYYY',
    lastDay: '[Yesterday]',
    lastWeek: 'DD/MM/YYYY',
    sameElse: 'DD/MM/YYYY'
}

const PollList = props =>

<ul className="polls">

    {
        props.polls.length === 0 ?

        <div className="polls-item">Create your first poll with the '+' button below</div> :

        props.polls.map((poll, index) => (
            <li className="polls-item" key={index}>
                <div className="poll-question"> { poll.question } </div>
                <div>
                    <span className="poll-date"> Created: { moment(poll.created).calendar(new Date(), formats) } </span>
                    <span className="poll-votes"> Votes: {0} </span>
                </div>
            </li>
        ))
    }


</ul>

module.exports = PollList;
