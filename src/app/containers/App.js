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

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.logout = this.logout.bind(this);
    }

    login () {
        this.setState({
            loggedIn: true
        })
    }

    componentDidMount() {
        var that = this;

        utils.isLoggedIn.
        userHelpers.isLoggedIn
            .then(function (loggedIn) {
                console.log(logedIn);
                that.setState({
                    loggedIn: logedIn
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
                    login={this.login}
                    register={this.register}
                    logout={this.logout}
                    loggedIn={this.state.loggedIn}
                />
                {
                    this.state.loggedIn ?
                    <Content /> :
                    <Login
                        login={this.login}
                        register={this.register}
                    />
                }
            </div>
        )
    }
}

module.exports = AppContainer;
