import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {handleLogout} from "../actions/authedUser";

const Nav = ({ dispatch, authedUser }) => {
  const logout = (e) => {
    e.preventDefault();
    dispatch(handleLogout());
  };
  
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link data-testid="home" to="/">Home</Link>
        </li>
        <li>
          <Link data-testid="new-poll" to="/add">New Poll</Link>
        </li>
        <li>
          <Link data-testid="leaderboard" to="/leaderboard">Leaderboard</Link>
        </li>
        <li data-testid='authedUser'>
          User: {authedUser}
        </li>
        <li>
          <Link data-testid='logout' onClick={logout}>Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};

export default connect(mapStateToProps)(Nav);
