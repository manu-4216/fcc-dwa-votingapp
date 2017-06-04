var React = require('react');

require('../style/main.scss');

const AnswerPoll = props =>

<div className="answer-poll-container center">

    <form className="answer-poll-form">
        <div className="answer-poll-question">{props.poll.question}</div>
        <div className='answer-poll-options-group'>
            <div className='answer-poll-options-label'>Options:</div>
            {props.poll.options.map((option, index) =>
                <label className="answer-poll-option" key={index + option}>
                    <input type="radio" name="answer" id={index} onChange={props.handleChoice} value={option}></input>
                    <span>{option}</span>
                </label>
            )}
            <button className='btn-add-option' onClick={props.handleAddOption}>
                Add option (if logged in)
            </button>
        </div>
    </form>

    <div className='group-submit-answer'>
        <button className={'btn-submit-answer ' + (props.answer ? '' : 'disabled')} onClick={props.handleSubmitVote}>
            Vote
        </button>
        <span>Select an option first</span>
    </div>

</div>

module.exports = AnswerPoll;
