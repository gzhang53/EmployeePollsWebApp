import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";

const Question = (props) => {
  if (props.question === null) {
    return <p>This Question doesn't existd</p>;
  }

  const { name, timestamp, optionOne, optionTwo, avatar, authedUser } =
    props.question;

  return (
    <div className="question">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <div className="question-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {/* <p>{optionOne.text}</p>
          <p>{optionTwo.text}</p> */}
        </div>
      </div>
    </div>
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
