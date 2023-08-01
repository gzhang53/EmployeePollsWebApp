import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { useParams } from "react-router-dom";

const QuestionPage = ({authedUser, questions, users}) => {
  const { id } = useParams();
  const question = questions[id];

  if (question === null) {
    return <p>This Question doesn't exist</p>;
  }

  const formattedQuestion = formatQuestion(question, users[question.author], authedUser)
  const { name, optionOne, optionTwo, avatar } = formattedQuestion;

  return (
    <div className="question">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <div className="question-info">
        <div>
          <span>{name}</span>
          <p>{optionOne.text}</p>
          <p>{optionTwo.text}</p>
        </div>
      </div>
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