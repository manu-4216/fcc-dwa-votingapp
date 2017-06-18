var React = require('react');
var PollList = require('../components/PollList');
var axios = require('axios');

class PollListContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.history.pushState('polls', 'Title', '/polls');
    }

    render() {
        return <PollList polls={this.props.polls}
                         deletePoll={this.props.deletePoll}
                         openPoll={this.props.openPoll}
                         loading={this.props.loading}
                         loggedIn={this.props.loggedIn}
                />
    }
}

module.exports = PollListContainer
