var React = require('react');
var PollList = require('../components/PollList');
var axios = require('axios');

class PollListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: []
        }
    }

    componentDidMount() {
        console.log('getting polls...');
        axios.get('/polls')
        .then(function (response) {
            debugger;
            console.log(response.data[0]);
            this.setState({
                polls: response.data
            })
        }.bind(this))
        .catch(function (err) {
            throw err
        });
    }

    render() {
        //return (<div>hello</div>)
        return <PollList polls={this.state.polls} />
    }
}

module.exports = PollListContainer
