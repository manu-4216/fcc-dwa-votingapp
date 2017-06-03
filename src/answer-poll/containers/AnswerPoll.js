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
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleSubmitVote = this.handleSubmitVote.bind(this);
    }

    handleChoice(event) {
        this.setState({
            answer: event.target.value
        })
    }

    handleSubmitVote(event) {
        event.preventDefault();

        if (this.state.answer) {
            console.log('add 1 vote');
            // then display graph
        }
    }

    handleAddOption(event) {
        event.preventDefault();
        console.log('Add option comming soon...')
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="answer-poll-container center">
                <div className="scrollable-content">

                        <form className="answer-poll-form">
                            <div className="answer-poll-question">{this.props.poll.question}</div>
                            <div className='answer-poll-options-group'>
                                <div className='answer-poll-options-label'>Options:</div>
                                {this.props.poll.options.map((option) =>
                                    <label className="answer-poll-option" key={option}>
                                        <input type="radio" name="answer" onChange={this.handleChoice} value={option}></input>
                                        <span>{option}</span>
                                    </label>
                                )}
                                <button className='btn-add-option' onClick={this.handleAddOption}>
                                    Add option (if logged in)
                                </button>
                            </div>
                        </form>

                        <div className='group-submit-answer'>
                            <button className={'btn-submit-answer ' + (this.state.answer ? '' : 'disabled')} onClick={this.handleSubmitVote}>
                                Vote
                            </button>
                            <span>Select an option first</span>
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
