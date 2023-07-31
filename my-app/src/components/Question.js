import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { Link } from "react-router-dom";

const Question = (props) => {
  if (props.question === null) {
    return <p>This Question doesn't exist</p>;
  }

  const { name, timestamp, optionOne, optionTwo, avatar, authedUser, id } =
    props.question;

  return (
    <Link to={`/questions/${id}`} className="question">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <div className="question-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {/* <p>{optionOne.text}</p>
          <p>{optionTwo.text}</p> */}
        </div>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
};

export default connect(mapStateToProps)(Question);
