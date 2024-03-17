import {connect} from "react-redux";
import {useState} from "react";
import {handleLogin, setAuthedUser} from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Login = ({users, dispatch}) => {
    const [username, setUsername] = useState('tylermcginnis');
    const [password, setPassword] = useState('abc321');
    const navigate = useNavigate();
    const [invalid, setInvalid] = useState(false)
    const logIn =()=>{

        if (Object.hasOwn(users,username)){
            if (users[username].password === password){
                dispatch(setAuthedUser(username));
            }
            else{
                setInvalid(true);
            }
        }
        else{
            setInvalid(true);
        }

    }
 

    const handleSubmit = (e) => {
        e.preventDefault();
        logIn();
    };
    
    
    return (
        <div className="login-container">
            <h1>Employee Polls</h1>
            <form className="login-form" onSubmit={handleSubmit}>
            <p>Username</p>
            
            <input type="text" data-testid='username' className="login-input" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            
            <p>Password</p>
            <input type="password" data-testid='password' className="login-input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" data-testid='submit' className="login-button">Login</button>
            </form>
            <div>{invalid && <span data-testid='error-message'>Your username or password is incorrect</span> }</div>
        </div>
    );
};

const mapStateToProps = ({users,authedUser}) => ({
    authedUser,
    users,
});

export default connect(mapStateToProps)(Login);
