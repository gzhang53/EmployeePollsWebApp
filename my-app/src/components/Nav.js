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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add">New Poll</Link>
        </li>
        <li>
          <Link to="/leaderboard">Leaderboard</Link>
        </li>
        <li>
          User: {authedUser}
        </li>
        <li>
          <Link onClick={logout}>Logout</Link>
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
