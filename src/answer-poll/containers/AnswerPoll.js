var React = require('react');
var axios = require('axios');
var billboard = require('billboard.js');

var AnswerPoll = require('../components/AnswerPoll');

require('../style/main.scss');

class AnswerPollContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            answerIndex: '',
            poll: {
                question: "...",
                options: []
            },
            answerIndex: '',
            customOptionAdded: false,
            customOption: '',
            voteSubmited: false
        };

        this.handleChoice = this.handleChoice.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleSubmitVote = this.handleSubmitVote.bind(this);
        this.handleCustomOptionEdit = this.handleCustomOptionEdit.bind(this);
    }

    handleChoice(event) {
        var realIndex,
            formIndex = event.target.getAttribute('id');

        realIndex = (formIndex === 'custom') ? this.state.poll.options.length : formIndex;

        this.setState({
            answerIndex: realIndex
        })
    }

    handleCustomOptionEdit(event) {
        this.setState({
            customOption: event.target.value
        })
    }

    handleSubmitVote(event) {
        event.preventDefault();

        if (this.state.answerIndex === '') {
            return;
        }

        // Update the votes server side
        axios.post('/api/vote', {
            answerIndex:  this.state.answerIndex,
            customOption: (this.state.answerIndex === this.state.poll.options.length) ? this.state.customOption : '',
            pollId: this.state.poll._id
        })
        .then(function (response) {
            // this.props.fetchPolls();
        }.bind(this))
        .catch(function (err) {
            throw err
        })

        this.setState({
            voteSubmited: true
        })

        function getVoteData (initialPoll, customOption, answerIndex) {
            var data = [];

            for (var i = 0; i < initialPoll.options.length; i++) {
                data.push([initialPoll.options[i], initialPoll.votes[i]]);
            }

            (initialPoll.options.length === answerIndex && customOption) && data.push([customOption, 1]);
            if (answerIndex < initialPoll.options.length) {
                data[answerIndex][1] += 1;
            }

            return data;
        }

        // Display the chart of the results:
        var chart = billboard.bb.generate({
            bindto: "#answer-chart",
            "size": {
                "height": 240,
                "width": 320
            },
            data: {
                type: "pie",
                columns: []
            }
        });

        // Add the real data on timeout, for getting an animation
        setTimeout(function() {
            chart.load({
                columns: getVoteData(this.state.poll, this.state.customOption, this.state.answerIndex)
            });
        }.bind(this), 200);

        // Scroll smootly to bottom, to see the chart:
        var scrollElem = document.querySelector('#answer-chart').parentElement;

        function scroll (position) {
            setTimeout(function() {
                scrollElem.scrollTop = position;
            }, position*3);
        }
        for (var position = 3; position < scrollElem.scrollHeight; position += 3) {
            scroll(100 + position);
        }
    }

    handleAddOption(event) {
        event.preventDefault();

        // Indicate that the custom option has been added (only once allowed, so toggle the boolean)
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
                voteSubmited={this.state.voteSubmited}
            />
        )
    }
}

module.exports = AnswerPollContainer


const PollResult = props =>

<div>
    <div>Results:</div>
</div>
