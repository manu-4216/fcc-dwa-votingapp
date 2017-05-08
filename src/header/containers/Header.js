var React = require('react');
require('../style/main.scss');

var Header = function(props) {
    return (
        <header className='header'>
            <img className='header--icon' src={require("common/res/images/icon.png")}></img>
            <title className='header--title'>VOTING APP</title>

            <div className='header--right-side'>
                <span className='header--welcome hidden'>Welcome, <span className="header--user-fullname"></span>!</span>
                <a className="header--menu linkto-profile" href="/profile">Profile</a>
                <span>|</span>
                <a className="header--menu" href="/logout">Logout</a>
            </div>
        </header>
    )
};

module.exports = Header;
