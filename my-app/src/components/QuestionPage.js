import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/questions";

const QuestionPage = ({dispatch, authedUser, questions, users}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestionAnswer(question, "optionOne"));
    navigate("/");
  }

  const handleOptionTwo = (e) => {
    e.preventDefault();
    console.log(authedUser)
    dispatch(handleAddQuestionAnswer(question, "optionTwo"));
    navigate("/");
  }

  const question = questions[id];
  if (question == null) {
    return <Navigate to="/Error404"/>; // need to return this component instead of use navigate
  }

  const formattedQuestion = formatQuestion(question, users[question.author], authedUser)
  const { name, optionOne, optionTwo, avatar } = formattedQuestion;

  const hasVotedOptionOne = question.optionOne.votes.includes(authedUser);
  const hasVotedOptionTwo = question.optionTwo.votes.includes(authedUser);
  const hasVoted = hasVotedOptionOne || hasVotedOptionTwo;
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOneText = "Votes: " + optionOneVotes.toString() + " (" + Math.round(100 * optionOneVotes/totalVotes) +  "%)";
  const optionTwoText = "Votes: " + optionTwoVotes.toString() + " (" + Math.round(100 * optionTwoVotes/totalVotes) +  "%)";

  return (
  <div className="poll-container">
    <h3>Poll by {name}</h3>
    <img src={avatar} alt={`Avatar of ${name}`} className="avatar-big" />
    <h3>Would You Rather</h3>
    {!hasVoted && (<div className="poll-options">
      <div className="poll-option">
        <p className="poll-textarea">{optionOne.text}</p>
        <button onClick={handleOptionOne} className="poll-button">Vote</button>
      </div>
      <div className="poll-option">
        <p className="poll-textarea">{optionTwo.text}</p>
        <button onClick={handleOptionTwo} className="poll-button">Vote</button>
      </div>
    </div>)}
    {hasVoted && (<div className="poll-options">
      <div className={`poll-option ${hasVotedOptionOne ? 'background-voted' : 'background-not-voted'}`}>
        <p>{optionOne.text}</p>
        <p>{optionOneText}</p>
      </div>
      <div className={`poll-option ${hasVotedOptionTwo ? 'background-voted' : 'background-not-voted'}`}>
        <p>{optionTwo.text}</p>
        <p>{optionTwoText}</p>
      </div>
    </div>)}
  </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  return {
    authedUser,
    questions,
    users
  };
};

export default connect(mapStateToProps)(QuestionPage);