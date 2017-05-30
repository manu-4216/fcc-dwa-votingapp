var React = require('react');
var axios = require('axios');

require('../style/main.scss');

class AnswerPoll extends React.Component {

    constructor(props) {
        super(props);
        console.log('OPTIONS', props.poll.options);
        this.state = {
            newPollLink: ''
        };

        //this.addOption = this.addOption.bind(this);
    }

    submitVote(event) {
        var that = this;

        event.preventDefault();
    }

    componentDidMount() {

    }

    render() {
        return (
            <div class='center'>

                <div className="answer-poll-container center">
                    <div className="scrollable-content">

                        <div>
                            <form className="answer-poll-form">
                                <div className="answer-poll-question">{this.props.poll.question}</div>
                                {this.props.poll.options.map((option) =>
                                    <label className="answer-poll-option">
                                        <input type="radio" name="answer" value={option}></input>
                                        <span>{option}</span>
                                    </label>
                                )}
                            </form>
                            <button className='btn-add-option'>
                                Add option (if logged in)
                            </button>

                            <button className='btn-submit-poll'>
                                Vote
                            </button>

                        </div>

                    </div>
                </div>
            </div>

        )
    }
}

module.exports = AnswerPoll


const PollResult = props =>

<div>
    <div>Results:</div>
</div>
