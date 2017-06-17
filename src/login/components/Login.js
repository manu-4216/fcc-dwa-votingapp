var React = require('react');

require('../style/main.scss');

const Login = props =>

<div className="center">
    <form className="login-form" action="/login" method="post">
        <div className="login-username">
            <label>Username:</label>
            <input type="text" name="username" autoComplete="off" value={props.username} onChange={props.handleUsernameEdit}/>
        </div>
        <div className="login-password">
            <label>Password:</label>
            <input type="password" name="password" autoComplete="off" value={props.password} onChange={props.handlePasswordEdit}/>
        </div>
        {props.errorMessage &&
            <div className="poll-error-msg">
                {props.errorMessage}
            </div>
        }
        <div>
            <button onClick={props.handleLogin}>Log In</button>
            <button onClick={props.handleRegister}>Register</button>
        </div>
    </form>
</div>


module.exports = Login;
