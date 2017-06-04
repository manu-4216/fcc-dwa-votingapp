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
            onPollPage: (window.location.pathname.indexOf('/poll/') === 0)
        })
    }

    componentDidMount() {
        var that = this;

        this.updateUrl();

        this.setState({
            loading: true
        });

        userHelpers.isLoggedIn()
            .then(function (loggedIn) {
                that.setState({
                    loggedIn: loggedIn,
                    loading: false
                });
            })
    }

    render() {
        //return <PollList polls={this.state.polls} />;
        return (
            <div>
                <Header
                    setLogin={this.setLogin}
                    loggedIn={this.state.loggedIn}
                    updateUrl={this.updateUrl}
                    onPollPage={this.state.onPollPage}
                />
                { this.state.loading ?
                    <div>Loading...</div> :
                    <div>{
                        this.state.loggedIn || this.state.onPollPage?
                        <Content loggedIn={this.state.loggedIn}
                                 onPollPage={this.state.onPollPage}
                                 updateUrl={this.updateUrl}
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
