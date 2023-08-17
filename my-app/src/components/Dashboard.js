import { useState } from "react";
import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = (props) => {
  // https://techwithcy.com/blog/2022-08-17-simple-toggle-view/
  const [isToggle, setIsToggle] = useState(true);
  
  const toggleChange = () => {
    setIsToggle(!isToggle)
  }

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
      <div>
        <input
          type="radio"
          value={true}
          name="toggle"
          checked={isToggle}
          onChange={toggleChange}
        />
        <label>New Questions</label>
        <input
          type="radio"
          value={false}
          name="toggle"
          onChange={toggleChange}
        />
        <label>Done</label>
      </div>

      {isToggle && (
        <div>
          <h3 className="center">New Questions</h3>
          <ul className="dashboard-list">
            {newQns.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </div>   
      )}

      {!isToggle && (
        <div>
          <h3 className="center">Done</h3>
          <ul className="dashboard-list">
            {doneQns.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </div>
      )}
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
