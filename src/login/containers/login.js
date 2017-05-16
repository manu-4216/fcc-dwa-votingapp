var React = require('react');
var axios = require('axios');
//require('../main.scss');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }


    handleRegister(e) {
        e.preventDefault();

        axios.post('/register',  {
            username: 'manuel' + Math.ceil(Math.random()*1000),
            password: '123'
        })
        .then(function (response) {
            this.props.setLogin(true);
        }.bind(this))
        .catch(function (err) {
            throw err
        })
    }

    handleLogin(e) {
        e.preventDefault();

        axios.post('/login',  {
            username: 'manuel569',
            password: '123'
        })
        .then(function (response) {
            this.props.setLogin(true);
        }.bind(this))
        .catch(function (err) {
            throw err
        })
    }

    render() {
        return  (
            <div>
                <form action="/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password"/>
                    </div>
                    <div>
                        <button onClick={this.handleLogin}>Log In</button>
                        <button onClick={this.handleRegister}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}


module.exports = Login;
