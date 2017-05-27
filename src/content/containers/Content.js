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
        //this.displayAddPollForm = this.displayAddPollForm.bind(this);
        //this.displayAddPollForm = this.displayAddPollForm.bind(this);
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
                votes: 0
            })
        })
    }

    componentDidMount() {
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
        return (
            <div>
                <PollList polls={this.state.polls} />

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
        )
    }
}

module.exports = PollListContainer
