import './App.css';
import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import Dashboard from "./components/Dashboard";
import LoadingBar from "react-redux-loading-bar";
import NewQuestion from "./components/NewQuestion";
import QuestionPage from "./components/QuestionPage";
import Leaderboard from "./components/Leaderboard";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div>
      <Fragment>
        <LoadingBar />
        <div className="container">
          <Nav />
          {props.loading === true ? null : (
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/questions/:id" element={<QuestionPage />} />
              <Route path="/add" element={<NewQuestion />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          )}
        </div>
      </Fragment>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(App);