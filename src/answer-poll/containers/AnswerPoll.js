var React = require('react');
var axios = require('axios');

var AnswerPoll = require('../components/AnswerPoll');

require('../style/main.scss');

class AnswerPollContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: '',
            poll: {
                question: "...",
                options: []
            }
        };

        this.handleChoice = this.handleChoice.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleSubmitVote = this.handleSubmitVote.bind(this);
    }

    handleChoice(event) {
        this.setState({
            answer: event.target.getAttribute('id')
        })
    }

    handleSubmitVote(event) {
        event.preventDefault();

        console.log('this.state.poll: ', this.state.poll);

        if (this.state.answer !== '') {
            axios.post('/api/vote', {
                vote:  this.state.answer,
                pollId: this.state.poll._id
            })
            .then(function (response) {
                console.log('Vote send');
            }.bind(this))
            .catch(function (err) {
                throw err
            })
            // then display graph
        }
    }

    handleAddOption(event) {
        event.preventDefault();
        console.log('Add option comming soon...')
    }

    componentDidMount() {
        var that = this,
            pollId;

        console.log('Passed pollToOpen', this.props.detailedPoll);

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
                console.log('answer ', answer);
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
                answer={this.state.answer}
                handleChoice={this.handleChoice}
                handleAddOption={this.handleAddOption}
                handleSubmitVote={this.handleSubmitVote}
                poll={this.state.poll}
            />
        )
    }
}

module.exports = AnswerPollContainer


const PollResult = props =>

<div>
    <div>Results:</div>
</div>
