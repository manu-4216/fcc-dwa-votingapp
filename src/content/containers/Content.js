var React = require('react');
//var PollList = require('../components/Content0');
var axios = require('axios');
var PollList = require('poll-list/containers/PollList');
var FloatingActionButton = require('fab/containers/FloatingActionButton');
var AddPollForm = require('add-poll-form/containers/AddPollForm');
var AnswerPoll = require('answer-poll/containers/AnswerPoll');

var poll = {
    "author": "user",
    "question": "Favorite color?",
    "created": "2017-05-28T08:14:21.176Z",
    "options": [
        "Red",
        "Black"
    ],
    "votes": []
};

class ContentContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            addPollOpen: false,
            pollToOpen: {}
        }
        this.displayAddPollForm = this.displayAddPollForm.bind(this);
        //this.displayAddPollForm = this.displayAddPollForm.bind(this);
        this.handleDeletePoll = this.handleDeletePoll.bind(this);
        this.openPoll = this.openPoll.bind(this);
        this.fetchPolls = this.fetchPolls.bind(this);
    }

    displayAddPollForm () {
        this.setState({
            addPollOpen: true
        });
        document.querySelector('body').style.overflow = 'hidden';
    }

    closeAddPollForm () {
        this.setState({
            addPollOpen: false
        });
        document.querySelector('body').style.overflow = 'auto';
    }

    handleAddPoll (newPoll) {
        this.setState({
            polls: this.state.polls.concat({
                question: newPoll.question,
                options: newPoll.options,
                _id: newPoll._id,
                votes: newPoll.options.map(item => 0)
            })
        })
    }

    handleDeletePoll (idToDelete, event) {
        event.stopPropagation();

        this.setState({
            polls: this.state.polls.filter((poll) =>
                {
                    if (idToDelete !== poll._id) {
                        return true;
                    } else {
                        return false;
                    }
                }
            )
        })

        console.log('idToDelete', idToDelete);
        axios.delete('api/poll/' + idToDelete)
        .then(function (response) {
            console.log(response);
        }.bind(this))
        .catch(function (err) {
            throw err
        });
    }

    openPoll(id) {
        console.log('ID: ', id);
        var pollToOpen = this.state.polls.filter((poll) => {
            return (poll._id === id)
        })[0];
        console.log('PollTo Open:', pollToOpen);

        this.setState({
            pollToOpen: pollToOpen
        });
        window.history.pushState('poll', 'Title', '/poll/' + id);
        this.props.updateUrl();
    }

    fetchPolls() {
        axios.post('/api/polls')
        .then(function (response) {
            console.log('/polls Fetch', response.data);
            this.setState({
                polls: response.data || []
            })
        }.bind(this))
        .catch(function (err) {
            throw err
        });
    }

    componentDidMount() {
        this.fetchPolls();
    }


    render() {
        return (
            <div>
            {(this.props.onPollPage) ?
                <AnswerPoll
                    detailedPoll={this.state.pollToOpen}
                    fetchPolls={this.fetchPolls}
                    loggedIn={this.props.loggedIn}
                /> :

                <div>
                    <PollList polls={this.state.polls}
                              deletePoll={this.handleDeletePoll.bind(this)}
                              openPoll={this.openPoll} />

                    {!this.state.addPollOpen ?
                        <FloatingActionButton
                            handleClick={this.displayAddPollForm}
                        /> :
                        <div>
                            <AddPollForm
                                handleClick={this.closeAddPollForm.bind(this)}
                                addPoll={this.handleAddPoll.bind(this)}
                            />
                        </div>
                    }
                </div>
            }
        </div>
        )
    }
}

module.exports = ContentContainer
