import {connect} from "react-redux";
import {useState} from "react";
import {handleLogin} from "../actions/authedUser";

const Login = ({dispatch}) => {
    const [username, setUsername] = useState("tylermcginnis");
    const [password, setPassword] = useState("abc321");

    const handleUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleLogin(username, password));
        setUsername("");
        setPassword("");
    };
    
    return (
        <div className="login-container">
            <h1>Employee Polls</h1>
            <form className="login-form" onSubmit={handleSubmit}>
            <input type="text" className="login-input" placeholder="Username" value={username} onChange={handleUsername}/>
            <input type="password" className="login-input" placeholder="Password" value={password} onChange={handlePassword}/>
            <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

const mapStateToProps = ({authedUser}) => ({
    loggedIn: authedUser !== null,
});

export default connect(mapStateToProps)(Login);
