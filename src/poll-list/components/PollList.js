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

// onClick={props.handleClick}

<ul className="polls">

    {
        props.polls.length === 0 ?

        <div className="polls-item">Create your first poll with the '+' button below</div> :

        props.polls.map((poll, index) => (
            <li className="polls-item" key={poll._id} onClick={props.openPoll.bind(null, poll._id)}>
                <button className='close-button' onClick={props.deletePoll.bind(null, poll._id)}>x</button>
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
