var React = require('react');

var Header = require('header/containers/Header');
var Content = require('content/containers/Content');
var Login = require('login/containers/Login');

var axios = require('axios');

require('../style/main.scss');

var userHelpers = require('common/utils/userHelpers');
var pollsHelpers = require('common/utils/pollsHelpers');


class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            polls: [],
            loggedIn: false,
            loading: false,
            activeRoute: '/'
        }

        this.setLogin = this.setLogin.bind(this);
        this.updateActiveRoute = this.updateActiveRoute.bind(this);
        this.fetchPolls = this.fetchPolls.bind(this);
        this.handleAddPoll = this.handleAddPoll.bind(this);
        this.handleDeletePoll = this.handleDeletePoll.bind(this);
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
        } else if (window.location.pathname.indexOf('/all') === 0) {
            activeRoute = 'all'
        } else if (window.location.pathname === '/') {
            activeRoute = '/'
        }


        this.setState({
            activeRoute: activeRoute
        }, function () {
            if (this.state.activeRoute === '/' || this.state.activeRoute === 'polls' || this.state.activeRoute === 'all') {
                this.fetchPolls();
            }
        })

    }

    fetchPolls() {
        var filter;

        this.setState({
            loading: true
        })

        if (this.state.activeRoute === '/' || this.state.activeRoute === 'all') {
            filter = 'all';
        }

        axios.post('/api/polls', { filter: filter })
        .then(function (response) {
            this.setState({
                polls: response.data || [],
                loading: false
            })
        }.bind(this))
        .catch(function (err) {
            throw err
        });
    }

    handleAddPoll (newPoll) {
        this.setState({
            polls: this.state.polls.concat({
                question: newPoll.question,
                options: newPoll.options,
                _id: newPoll._id,
                votes: newPoll.options.map(item => 0)
            })
        })
    }

    handleDeletePoll (idToDelete, event) {
        event.stopPropagation();

        this.setState({
            polls: this.state.polls.filter((poll) =>
                {
                    if (idToDelete !== poll._id) {
                        return true;
                    } else {
                        return false;
                    }
                }
            )
        })

        axios.delete('api/poll/' + idToDelete)
        .then(function (response) {
        }.bind(this))
        .catch(function (err) {
            throw err
        });
    }


    componentDidMount() {
        var that = this,
            newHash;

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
                if (that.state.activeRoute !== 'poll') {
                    newHash = loggedIn ? 'polls' : 'all';
                    window.history.pushState(newHash, '', '/' + newHash);
                    that.updateActiveRoute();
                    that.fetchPolls();
                }
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
                        {(['polls', 'poll', 'all', '/'].indexOf(this.state.activeRoute) > -1) &&
                            <Content loggedIn={this.state.loggedIn}
                                     activeRoute={this.state.activeRoute}
                                     updateActiveRoute={this.updateActiveRoute}
                                     handleAddPoll={this.handleAddPoll}
                                     handleDeletePoll={this.handleDeletePoll}
                                     fetchPolls={this.fetchPolls}
                                     polls={this.state.polls}
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
