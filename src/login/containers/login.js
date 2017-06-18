var React = require('react');
var axios = require('axios');

var Login = require('../components/Login');

require('../style/main.scss');

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleUsernameEdit = this.handleUsernameEdit.bind(this);
        this.handlePasswordEdit = this.handlePasswordEdit.bind(this);
    }

    componentDidMount() {
        //window.history.pushState('login', 'Title', '/login');
    }

    handleUsernameEdit(event) {
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordEdit(event) {
        this.setState({
            password: event.target.value
        })
    }

    handleRegister(e) {
        var that = this;

        e.preventDefault();

        axios.post('/register',  {
            username: this.state.username,
            password: this.state.password
        })
        .then(function (response) {
            return axios.post('/login',  {
                username: that.state.username,
                password: that.state.password
            })
        })
        .then(function(response) {
            that.props.setLogin(true);
            window.history.pushState('polls', 'Title', '/polls');
            that.props.updateActiveRoute();
        })
        .catch(function (err) {
            if (err) {
                that.setState({
                    errorMessage: "Please check your credentials"
                })
            }
        })
    }

    handleLogin(e) {
        var that = this;

        e.preventDefault();

        axios.post('/login',  {
            username: this.state.username,
            password: this.state.password
        })
        .then(function (response) {
            that.props.setLogin(true);
            window.history.pushState('polls', 'Title', '/polls');
            that.props.updateActiveRoute();
        })
        .catch(function (err) {
            if (err) {
                that.setState({
                    errorMessage: "Please check your credentials"
                })
            }
        })
    }

    render() {
        return <Login
                    username={this.state.username}
                    password={this.state.password}
                    errorMessage={this.state.errorMessage}
                    handleUsernameEdit={this.handleUsernameEdit}
                    handlePasswordEdit={this.handlePasswordEdit}
                    handleLogin={this.handleLogin}
                    handleRegister={this.handleRegister}
                />
    }
}


module.exports = LoginContainer;
