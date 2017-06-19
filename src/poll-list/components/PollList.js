var React = require('react');
var moment = require('moment');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

require('../style/main.scss');

var formats = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'DD/MM/YYYY',
    lastDay: '[Yesterday]',
    lastWeek: 'DD/MM/YYYY',
    sameElse: 'DD/MM/YYYY'
}

function getTotalVotes(votes) {
    return votes.reduce(function(a, b) {
        return a + b;
    }, 0);
}


const PollList = props =>

<ul className="polls">

    {props.polls.length === 0 ?

        <div>
            {!props.loading &&
                <div className="polls-item">Create your first poll with the '+' button below</div>
            }
        </div> :

        <ReactCSSTransitionGroup transitionName="anim" transitionEnterTimeout={500} transitionAppear={true} transitionAppearTimeout={300} transitionLeaveTimeout={500}>
            {props.polls.map((poll, index) => (
                <li className="polls-item" key={poll._id} onClick={props.openPoll.bind(null, poll._id)}>
                    {(props.activeRoute === 'polls') &&
                        <button className='close-button' onClick={props.deletePoll.bind(null, poll._id)}>x</button>
                    }
                    <div className="poll-question"> { poll.question } </div>
                    <div>
                        <span className="poll-date"> Created: { moment(poll.created).calendar(new Date(), formats) } </span>
                        {(props.activeRoute === '/' || props.activeRoute === 'all') &&
                            <span className="poll-author"> Author: { poll.author } </span>
                        }
                        <span className="poll-votes"> Votes: {getTotalVotes(poll.votes)} </span>
                    </div>
                </li>
            ))}
        </ReactCSSTransitionGroup>
    }


</ul>

module.exports = PollList;
