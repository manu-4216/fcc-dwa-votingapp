var React = require('react');

var Header = require('header/containers/Header');
var Content = require('content/containers/Content');
var Login = require('login/containers/Login');

require('../style/main.scss');

var userHelpers = require('common/utils/userHelpers');
var pollsHelpers = require('common/utils/pollsHelpers');


class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            loading: false,
            activeRoute: '/'
        }

        this.setLogin = this.setLogin.bind(this);
        this.updateActiveRoute = this.updateActiveRoute.bind(this);
    }

    setLogin (newLoginState) {
        this.setState({
            loggedIn: newLoginState
        })
    }

    updateActiveRoute() {
        var activeRoute;

        if (window.location.pathname.indexOf('/polls') === 0) {
            activeRoute = 'polls';
        } else if (window.location.pathname.indexOf('/poll/') === 0) {
            activeRoute = 'poll';
        } else if (window.location.pathname.indexOf('/login') === 0) {
            activeRoute = 'login'
        }
        this.setState({
            activeRoute: activeRoute
        })
    }

    componentDidMount() {
        var that = this;

        this.updateActiveRoute();

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
            .catch(function (err) {
                if (err) throw err;
            })
    }

    render() {
        return (
            <div>
                <Header
                    setLogin={this.setLogin}
                    loggedIn={this.state.loggedIn}
                    updateActiveRoute={this.updateActiveRoute}
                    activeRoute={this.state.activeRoute}
                />
                { this.state.loading ?
                    <div>Loading...</div> :
                    <div>
                        {(this.state.activeRoute === 'polls' || this.state.activeRoute === 'poll' || this.state.activeRoute === '/') &&
                            <Content loggedIn={this.state.loggedIn}
                                     activeRoute={this.state.activeRoute}
                                     updateActiveRoute={this.updateActiveRoute}
                            />
                        }

                        {this.state.activeRoute === 'login' &&
                            <Login
                                setLogin={this.setLogin}
                                updateActiveRoute={this.updateActiveRoute}
                            />
                        }
                    </div>
                }
            </div>
        )
    }
}

module.exports = AppContainer;
