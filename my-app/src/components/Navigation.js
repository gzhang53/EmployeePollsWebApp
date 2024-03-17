import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {handleLogout} from "../actions/authedUser";
import "./Navigation.css"


const Navigation = ({ dispatch, authedUser }) => {

  const navigate = useNavigate();

  const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
        navigate('/');
      }
 
  // const loggedInUser = users[String(authedUser)];
  return (
    <nav className="nav">
      <ul className="nav-bar">
        <li>
          <NavLink data-testid="home" to="/">Home</NavLink>
        </li>
        <li >
          <NavLink data-testid="new-poll" to="/add">New</NavLink>
        </li>
        <li>
          <NavLink data-testid="leaderboard" to="/leaderboard">Leaderboard</NavLink>
        </li>
        <li data-testid='authedUser'>
          <NavLink>
          {authedUser}
          
          </NavLink>
        </li>
        <li>
          <NavLink data-testid='logout' onClick={handleLogOut}>Logout</NavLink>
        </li>
        
      </ul>
    </nav>
  );


  
};

const mapStateToProps = ({ authedUser }) => {
  return {
    
    authedUser
  };
};

export default connect(mapStateToProps)(Navigation);
