var React = require('react');
//var PollList = require('../components/Content0');
var axios = require('axios');
var PollList = require('poll-list/containers/PollList');
var FloatingActionButton = require('fab/containers//FloatingActionButton');
var AddPollForm = require('add-poll-form/containers//AddPollForm');

class PollListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            addPollOpen: false
        }
        this.displayAddPollForm = this.displayAddPollForm.bind(this);
    }

    displayAddPollForm () {
        this.setState({
            addPollOpen: true
        })
    }

    closeAddPollForm () {
        this.setState({
            addPollOpen: false
        })
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
        return (
            <div>
                <PollList/>

                {!this.state.addPollOpen ?
                    <FloatingActionButton
                        handleClick={this.displayAddPollForm}
                    /> :
                    <div>
                        <AddPollForm
                            handleClick={this.closeAddPollForm.bind(this)}
                        />
                    </div>
                }
            </div>
        )
    }
}

module.exports = PollListContainer
