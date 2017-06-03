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
            loggedIn: false,
            loading: false
        }

        this.setLogin = this.setLogin.bind(this);
        this.updateUrl = this.updateUrl.bind(this);
    }

    setLogin (newLoginState) {
        this.setState({
            loggedIn: newLoginState
        })
    }

    updateUrl() {
        this.setState({
            onPollPage: (window.location.pathname.indexOf('/poll') === 0)
        })
    }

    componentDidMount() {
        var that = this;

        that.setState({
            onPollPage: (window.location.pathname.indexOf('/poll') === 0)
        })

        that.setState({
            loading: true
        });

        userHelpers.isLoggedIn()
            .then(function (loggedIn) {
                that.setState({
                    loggedIn: loggedIn,
                    loading: false
                });
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
                    loggedIn={this.state.loggedIn}
                    updateUrl={this.updateUrl}
                />
                { this.state.loading ?
                    <div>Loading...</div> :
                    <div>{
                        this.state.loggedIn || this.state.onPollPage?
                        <Content loggedIn={this.state.loggedIn}
                                 onPollPage={this.state.onPollPage}
                        /> :
                        <Login
                            setLogin={this.setLogin}
                        />
                    }</div>
                }
            </div>
        )
    }
}

module.exports = AppContainer;
