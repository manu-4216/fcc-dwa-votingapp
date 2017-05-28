var React = require('react');
var PollList = require('../components/PollList');
var axios = require('axios');

class PollListContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <PollList polls={this.props.polls} deletePoll={this.props.deletePoll} />
    }
}

module.exports = PollListContainer
