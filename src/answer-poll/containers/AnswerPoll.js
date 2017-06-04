var React = require('react');
var axios = require('axios');

var AnswerPoll = require('../components/AnswerPoll');

require('../style/main.scss');

class AnswerPollContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answerIndex: '',
            poll: {
                question: "...",
                options: [],
                customOptionAdded: false,
                customOption: ''
            }
        };

        this.handleChoice = this.handleChoice.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleSubmitVote = this.handleSubmitVote.bind(this);
        this.handleCustomOptionEdit = this.handleCustomOptionEdit.bind(this);
    }

    handleChoice(event) {
        this.setState({
            answerIndex: event.target.getAttribute('id')
        })
    }

    handleCustomOptionEdit(event) {
        this.setState({
            customOption: event.target.value
        })
    }

    handleSubmitVote(event) {
        event.preventDefault();

        if (this.state.answerIndex !== '') {
            axios.post('/api/vote', {
                answerIndex:  this.state.answerIndex,
                customOption: (this.state.answerIndex === 'custom') ? this.state.customOption : '',
                pollId: this.state.poll._id
            })
            .then(function (response) {
                // Update the polls thus, getting the new vote count
                if (this.props.loggedIn) {
                    this.props.fetchPolls();
                }
            }.bind(this))
            .catch(function (err) {
                throw err
            })
            // then display graph
        }
    }

    handleAddOption(event) {
        event.preventDefault();

        // Indicate that the custom uption has been added (Only once allowed)
        this.setState({
            customOptionAdded: true
        });
    }

    componentDidMount() {
        var that = this,
            pollId;

        // If there is a passed detailedPoll from a parent component, render it:
        if (Object.keys(this.props.detailedPoll).length > 0) {
            this.setState({
                poll: this.props.detailedPoll
            })

        // Otherwise it means that the access has been done by URL, so extract the id from it:
        } else {
            pollId = window.location.pathname.split('/poll/')[1];
            axios.get('/api/poll/' + pollId)
            .then(function(answer) {
                that.setState({
                    poll: answer.data
                })
            })
            .catch(function (err) {
                throw err;
            })
        }
    }

    render() {
        return (
            <AnswerPoll
                answerIndex={this.state.answerIndex}
                loggedIn={this.props.loggedIn}
                customOptionAdded={this.state.customOptionAdded}
                handleChoice={this.handleChoice}
                handleAddOption={this.handleAddOption}
                handleSubmitVote={this.handleSubmitVote}
                poll={this.state.poll}
                handleCustomOptionEdit={this.handleCustomOptionEdit}
                customOption={this.state.customOption}
            />
        )
    }
}

module.exports = AnswerPollContainer


const PollResult = props =>

<div>
    <div>Results:</div>
</div>
