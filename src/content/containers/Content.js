var React = require('react');
//var PollList = require('../components/Content0');
var axios = require('axios');
var PollList = require('poll-list/containers/PollList');
var FloatingActionButton = require('fab/containers/FloatingActionButton');
var AddPollForm = require('add-poll-form/containers/AddPollForm');
var AnswerPoll = require('answer-poll/containers/AnswerPoll');


class ContentContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addPollOpen: false,
            pollToOpen: {}
        }
        this.displayAddPollForm = this.displayAddPollForm.bind(this);
        this.openPoll = this.openPoll.bind(this);
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


    openPoll(id) {
        var pollToOpen = this.props.polls.filter((poll) => {
            return (poll._id === id)
        })[0];

        this.setState({
            pollToOpen: pollToOpen
        });
        window.history.pushState('poll', 'Title', '/poll/' + id);
        this.props.updateActiveRoute();
    }


    componentDidMount() {
    }


    render() {
        return (
            <div>
            {(this.props.activeRoute === 'poll') ?
                <AnswerPoll
                    detailedPoll={this.state.pollToOpen}
                    fetchPolls={this.props.fetchPolls}
                    loggedIn={this.props.loggedIn}
                /> :

                <div>
                    <PollList polls={this.props.polls}
                              deletePoll={this.props.handleDeletePoll}
                              openPoll={this.openPoll}
                              loading={this.props.loading}
                              loggedIn={this.props.loggedIn}
                              activeRoute={this.props.activeRoute}
                    />

                    {this.props.loggedIn &&
                        <div>
                            {!this.state.addPollOpen ?
                                <FloatingActionButton
                                    handleClick={this.displayAddPollForm}
                                /> :
                                <div>
                                    <AddPollForm
                                        handleClick={this.closeAddPollForm.bind(this)}
                                        addPoll={this.props.handleAddPoll}
                                    />
                                </div>
                            }
                        </div>
                    }

                </div>
            }
        </div>
        )
    }
}

module.exports = ContentContainer
