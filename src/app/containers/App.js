var React = require('react');

var Header = require('header/containers/Header');
var Content = require('content/containers/Content');
var Login = require('login/containers/login');

require('../style/main.scss');

var userHelpers = require('common/utils/userHelpers');
var pollsHelpers = require('common/utils/pollsHelpers');


class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }

        this.setLogin = this.setLogin.bind(this);
    }

    setLogin (newLoginState) {
        this.setState({
            loggedIn: newLoginState
        })
    }

    componentDidMount() {
        var that = this;

        userHelpers.isLoggedIn()
            .then(function (loggedIn) {
                console.log(loggedIn);
                that.setState({
                    loggedIn: loggedIn
                })
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
        return (
            <div>
                <Header
                    setLogin={this.setLogin}
                />
                {
                    this.state.loggedIn ?
                    <Content /> :
                    <Login
                        setLogin={this.setLogin}
                    />
                }
            </div>
        )
    }
}

module.exports = AppContainer;
