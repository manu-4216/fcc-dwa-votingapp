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
        newOptionItem.setAttribute('key', this.pollOptionList.children.length + 1);
        newOptionItem.querySelector('input').value = '';
        this.pollOptionList.appendChild(newOptionItem);

        //var newOptionBody = newOptionItem.querySelector('.poll-option');
        //newOptionBody.value = '';
    }

    submitPoll(event) {
        event.preventDefault();
        var arrayOptions = [];

        for (var option of this.pollOptionList.children) {
            arrayOptions.push(option.querySelector('input').value);
        }

        axios.post('/api/addpoll', {
            question: this.pollQuestion.value,
            options: arrayOptions
      })
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
            <div>
                <div className='backdrop'></div>

                <div className="container container--create-poll">
                    <form className="poll-form">
                        <label htmlFor='question'>Poll question:</label>
                        <input type='text'
                            className='poll-question'
                            id='question'
                            name='question'
                            autocomplete='off'
                            ref={(pollQuestion) => { this.pollQuestion = pollQuestion }} >
                        </input>

                        <label>Options:</label>
                        <ul className='poll-option-list' ref={(list) => { this.pollOptionList = list }}>
                            <li className="poll-option-item"  ref={(optionItem) => { this.optionItem = optionItem }}>
                                <input type="text" className="poll-option" name='options' key='1'></input>
                            </li>
                            <li className="poll-option-item">
                                <input type="text" className="poll-option" name='options' key='2'></input>
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
