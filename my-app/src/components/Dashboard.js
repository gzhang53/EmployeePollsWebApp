import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = (props) => {  
  const doneQns = props.questionIds.filter((id) => (
    props.questions[id].optionOne.votes.includes(props.authedUser) || 
    props.questions[id].optionTwo.votes.includes(props.authedUser)
  ));

  const newQns = props.questionIds.filter((id) => (
    !doneQns.includes(id)
  ));

  console.log(doneQns);
  console.log(newQns);

  return (
    <div>
      <h3 className="center">New Questions</h3>
      <ul className="dashboard-list">
        {newQns.map((id) => (
          <li key={id}>
            <Question id={id} />
          </li>
        ))}
      </ul>
      <h3 className="center">Done</h3>
      <ul className="dashboard-list">
        {doneQns.map((id) => (
          <li key={id}>
            <Question id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  ),
  questions,
  authedUser
});

export default connect(mapStateToProps)(Dashboard);
