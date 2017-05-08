var React = require('react');
var Header = require('header/containers/Header');
var Content = require('content/containers/Content');
var Login = require('login/containers/login');

require('../style/main.scss');


var App = function(props) {
    console.log(props)
    return (
        <div>
            <Header />
            {
                props.logged ?
                <Content /> :
                <Login login={props.login}/>
            }
        </div>
    )
};

module.exports = App;
