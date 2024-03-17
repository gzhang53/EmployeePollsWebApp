import './App.css';
import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Dashboard from "./components/Dashboard";
import LoadingBar from "react-redux-loading-bar";
import NewQuestion from "./components/NewQuestion";
import QuestionPage from "./components/QuestionPage";
import Leaderboard from "./components/Leaderboard";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Error from "./components/Error";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div>
      {props.authedUser !== null && (<Fragment>
        <LoadingBar />
        <div className="container">
          <Navigation />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/questions/:id" element={<QuestionPage />} />
              <Route path="/add" element={<NewQuestion />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/Error" element={<Error />} />
            </Routes>
        </div>
      </Fragment>)}
      {props.authedUser === null && <LoadingBar />}
      {props.authedUser === null && props.loading === false && (<Fragment>
        <div className="container">
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/questions/:id" element={<Login />} />
              <Route path="/add" element={<Login />} />
              <Route path="/leaderboard" element={<Login />} />
              <Route path="/Error" element={<Error />} />
            </Routes>
        </div>
      </Fragment>)}

    </div>
  );
}

const mapStateToProps = ({ authedUser, loadingBar }) => ({
  loading: loadingBar != null && loadingBar.default === true,
  authedUser
});

export default connect(mapStateToProps)(App);