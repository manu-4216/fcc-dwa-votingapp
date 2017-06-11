var React = require('react');

require('../style/main.scss');

const AnswerPoll = props =>

<div className="answer-poll-container center">
    <form className="answer-poll-form">
        <div className="answer-poll-question">{props.poll.question}</div>
        <div className="scrollable-content">

            <div className='answer-poll-options-group'>
                <div className='answer-poll-options-label'>Options:</div>
                {props.poll.options.map((option, index) =>
                    <label className="answer-poll-option" key={index}>
                        <input type="radio" name="answer" id={index} onChange={props.handleChoice} value={option}></input>
                        <span>{option}</span>
                    </label>
                )}
                {props.customOptionAdded &&
                    <label className="answer-poll-option" key="custom">
                        <input type="radio" name="answer" id="custom" onChange={props.handleChoice} value="custom"></input>
                        <input className="custom-option" type="text" autoComplete="off" value={props.customOption} onChange={props.handleCustomOptionEdit}/>
                    </label>
                }
                { (props.loggedIn && !props.customOptionAdded) &&
                    <button className='btn-add-option' onClick={props.handleAddOption}>
                        Add custom option
                    </button>
                }
            </div>
            <div id="answer-chart" className="chart"></div>
        </div>
    </form>

    {!props.voteSubmited &&
        <div className='group-submit-answer'>
            <button className={'btn-submit-answer ' + (props.answerIndex ? '' : 'disabled')} onClick={props.handleSubmitVote}>
                Vote
            </button>
            <span>Select an option first</span>
        </div>
    }

</div>

module.exports = AnswerPoll;
