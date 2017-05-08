var React = require('react');
//var PollList = require('../components/Content0');
var axios = require('axios');

class PollListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: []
        }
    }

    componentDidMount() {
        /*
        axios.get('/polls')
        .then(function (response) {
            //console.log(response.data[0]);
            this.setState({
                polls: response.data
            })
        }.bind(this))
        .catch(function (err) {
            throw err
        });
        */
    }

    render() {
        //return <PollList polls={this.state.polls} />;
        //return <div>{this.state.polls}</div>
        return <div>CONTENT</div>
    }
}

module.exports = PollListContainer
