var React = require('react');
var axios = require('axios');

require('../style/main.scss');

class AddPollForm extends React.Component {

    constructor(props) {
        super(props);
        this.addOption = this.addOption.bind(this);
        this.submitPoll = this.submitPoll.bind(this);
    }

    addOption(event) {
        event.preventDefault();

        var newOptionItem = this.optionItem.cloneNode(true);
        debugger;
        newOptionItem.querySelector('input').value = '';
        this.pollOptionList.appendChild(newOptionItem);

        //var newOptionBody = newOptionItem.querySelector('.poll-option');
        //newOptionBody.value = '';
    }

    submitPoll(event) {
        var arrayOptions = [],
            newPoll;

        event.preventDefault();

        for (var option of this.pollOptionList.children) {
            arrayOptions.push(option.querySelector('input').value);
        }

        newPoll = {
            question: this.pollQuestion.value,
            options: arrayOptions
        };
        this.props.addPoll(newPoll);

        axios.post('/api/addpoll', newPoll)
        .then(function (response) {
            console.log('Submit response', response.data);
            //var newPollLink = response.data;

            //cleanForm();
            //cleanErrors();
            //pollInfo.innerHTML = 'Congratulations, your new poll has been created. <br> Link: ' + '<a href="' + newPollLink +'" target="_blank">' + newPollLink + '</a>';
        })
        .catch(function (err) {
            console.log('Submit error ', err)
            //displayErrors(err);
            //cleanPollInfo()
        });
    }

    componentDidMount() {

    }

    render() {
        return (
            <div class='center'>
                <div className='backdrop'></div>

                <div className="container center">
                    <button className='close-button' onClick={this.props.handleClick}>x</button>
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

                    <button className='btn-add-option' onClick={this.addOption}>
                        Add option
                    </button>

                    <p className='poll-error-msg hidden'></p>

                    <button className='btn-submit-poll' onClick={this.submitPoll}>
                        Submit
                    </button>

                    <p className='new-poll-info'></p>
                </div>
            </div>

        )
    }
}

module.exports = AddPollForm
