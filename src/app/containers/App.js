var React = require('react');
var App = require('../components/App');
var axios = require('axios');

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            logged: false
        }

        this.login = this.login.bind(this);
    }

    login () {
        this.setState({
            loading: false,
            logged: true
        })
    }

    componentDidMount() {
        var path = window.location.pathname;

        axios.get('checklogin')
        .then(function (response) {
            if (response.logged === 'true') {
                this.setState({
                    loading: false,
                    logged: response
                })
            }
        })
        .catch(function (err) {
            throw err
        })
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
        return  <App loading={this.state.logged}
                     logged={this.state.logged}
                     login={this.login}
                />
    }
}

module.exports = AppContainer;
