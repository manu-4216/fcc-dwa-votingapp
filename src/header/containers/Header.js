var React = require('react');
var axios = require('axios');
require('../style/main.scss');

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.goToPolls = this.goToPolls.bind(this);
    }

    goToPolls() {
        window.history.pushState('polls', 'Title', '/polls');
        this.props.updateUrl();
    }

    handleLogout(e) {
        e.preventDefault();

        window.history.pushState('login', 'Title', '/login');
        this.props.updateUrl();

        axios.get('/logout')
        .then(function (response) {
            this.props.setLogin(false);
        }.bind(this))
        .catch(function (err) {
            throw err
        })
    }

    render () {
        return (
            <header className='header'>
                <img className='header--icon' src={require("common/res/images/icon.png")}></img>
                <title className='header--title'>VOTING APP</title>

                <div className='header--right-side'>
                    {(this.props.onPollPage && this.props.loggedIn) &&
                        <span>
                            <a className="header--menu linkto-polls" onClick={this.goToPolls}>My Polls</a>
                            <span>|</span>
                        </span>
                    }
                    {this.props.loggedIn ?
                        <button className="header--menu" onClick={this.handleLogout}>Logout</button> :
                        <button className="header--menu" onClick={this.handleLogout}>Login</button>
                    }
                </div>
            </header>
        )
    }
}

module.exports = Header;
