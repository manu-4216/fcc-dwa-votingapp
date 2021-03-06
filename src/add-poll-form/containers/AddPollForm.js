var React = require('react');
var axios = require('axios');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

require('../style/main.scss');

class AddPollForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newPollLink: ''
        };
        this.addOption = this.addOption.bind(this);
        this.submitPoll = this.submitPoll.bind(this);
    }

    addOption(event) {
        event.preventDefault();

        var newOptionItem = this.optionItem.cloneNode(true);
        debugger;
        newOptionItem.querySelector('input').value = '';
        this.pollOptionList.appendChild(newOptionItem);
    }

    localValidation(poll) {
        return (poll.question && poll.options[0] && poll.options[1]) ;
    }

    submitPoll(event) {
        var that = this,
            arrayOptions = [],
            newPoll,
            isNewPollValid;

        event.preventDefault();
        that.errorMsg.innerHTML = '';

        for (var option of this.pollOptionList.children) {
            var optionValue = option.querySelector('input').value;
            optionValue && arrayOptions.push(optionValue);
        }

        newPoll = {
            question: this.pollQuestion.value,
            options: arrayOptions
        };

        isNewPollValid = this.localValidation(newPoll);

        if (isNewPollValid) {
            //this.errorMsg.classList.add('hidden');

            axios.post('/api/addpoll', newPoll)
            .then(function (response) {
                // Add the id to the new poll:
                newPoll._id =  response.data._id;

                that.props.addPoll(newPoll);
                that.setState({
                    newPollLink: response.data.url
                });
            })
            .catch(function (err) {
                //that.errorMsg.classList.remove('hidden');
                console.log(err);
                that.errorMsg.innerHTML = err.response && err.response.data && err.response.data.message || err.message;
            });
        } else {
            //this.errorMsg.classList.remove('hidden');
            this.errorMsg.innerHTML = "Invalid poll. The question and 2 options are mandatory";
        }
    }

    componentDidMount() {

    }

    render() {
        return (

            <div className='center fixed'>
                <div className='backdrop'></div>
                <ReactCSSTransitionGroup transitionName="answer" transitionAppear={true} transitionAppearTimeout={300}>

                    <div className="add-poll-container">
                        <div className="scrollable-content">
                            <button className='close-button' onClick={this.props.handleClick}>x</button>
                            {this.state.newPollLink ?
                                <NewPollInfo newPollLink={this.state.newPollLink}/> :
                                <div>
                                    <form className="poll-form">
                                        <label htmlFor='question'>Poll question:</label>
                                        <textarea
                                            className='poll-question'
                                            rows='2'
                                            id='question'
                                            name='question'
                                            autoComplete='off'
                                            ref={(pollQuestion) => { this.pollQuestion = pollQuestion }} >
                                        </textarea>

                                        <label>Options:</label>
                                        <ul className='poll-option-list' ref={(list) => { this.pollOptionList = list }}>
                                            <li className="poll-option-item"  ref={(optionItem) => { this.optionItem = optionItem }}>
                                                <input type="text" className="poll-option" name='options' autoComplete="off"></input>
                                            </li>
                                            <li className="poll-option-item">
                                                <input type="text" className="poll-option" name='options' autoComplete="off"></input>
                                            </li>
                                        </ul>

                                    </form>

                                    <p className='poll-error-msg' ref={(errorMsg) => { this.errorMsg = errorMsg }}></p>

                                    <button className='btn-add-option' onClick={this.addOption}>
                                        Add extra option
                                    </button>

                                    <button className='btn-submit-poll' onClick={this.submitPoll}>
                                        Submit
                                    </button>

                                    <p className='new-poll-info'></p>
                                </div>
                            }

                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </div>

        )
    }
}

module.exports = AddPollForm


const NewPollInfo = props =>

<div className="new-poll-info">
    <div className="new-poll-title">Congratulations, your new poll has been created.</div>
    <div> Link:</div>
    <a className="new-poll-link" href={props.newPollLink} target="_blank">{props.newPollLink}</a>
</div>
