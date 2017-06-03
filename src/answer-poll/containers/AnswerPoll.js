var React = require('react');
var axios = require('axios');

require('../style/main.scss');

class AnswerPoll extends React.Component {

    constructor(props) {
        super(props);
        console.log('OPTIONS', props.poll.options);
        this.state = {
            answer: ''
        };

        this.handleChoice = this.handleChoice.bind(this);
    }

    handleChoice(event) {
        this.setState({
            answer: event.target.value
        })
    }

    submitVote(event) {
        var that = this;

        event.preventDefault();
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="answer-poll-container center">
                <div className="scrollable-content">

                    <div>
                        <form className="answer-poll-form">
                            <div className="answer-poll-question">{this.props.poll.question}</div>
                            {this.props.poll.options.map((option) =>
                                <label className="answer-poll-option" key={option}>
                                    <input type="radio" name="answer" onChange={this.handleChoice} value={option}></input>
                                    <span>{option}</span>
                                </label>
                            )}
                        </form>
                        <button className='btn-add-option'>
                            Add option (if logged in)
                        </button>

                        <div className='group-submit-answer'>
                            <button className={'btn-submit-answer ' + (this.state.answer ? '' : 'disabled')}>
                                Vote
                            </button>
                            <span>Select an option first</span>
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
