import './Dashboard.css'
import { useState } from "react";
import { connect } from "react-redux";
import Question from "./Question";


const Dashboard = (props) => {
  
  const [toggle, setToggle] = useState(true);
  
  const toggleView = () => {
    setToggle(!toggle)
  }

  const answeredQuestions = props.questionIds.filter((id)=>
                                                        props.questions[id].optionOne.votes.includes(props.authedUser)||
                                                        props.questions[id].optionTwo.votes.includes(props.authedUser))

  const newQuestions = props.questionIds.filter((id)=>
    !props.questions[id].optionOne.votes.includes(props.authedUser)&&
    !props.questions[id].optionTwo.votes.includes(props.authedUser))

  

  return (
    <div className="dashboard">
            <div className='toggle-button'>
                
                <label for="myCheck">Toggle View</label> 
                <input type="checkbox" value={true} id="myCheck" onClick={toggleView}></input>
               
            </div>
            <br></br>
            {toggle &&<div className="New-Questions">
                <h3>New Questions</h3>
                
                <ul className="new-questions-list" >
                    {newQuestions.map((id) => (
                        <li key={id} >
                            <Question id={id} />
                        </li>
                    ))}
                </ul>
            
            </div>}
            {!toggle &&<div className="Answered-Questions">
                <h3>Answered Questions</h3>
                
                  <ul className="answered-questions-list">
                  
                  
                    {answeredQuestions.map((id) => (
                        <li key={id} >
                            <Question id={id} />
                        </li>
                    ))}
                  
                  
                  </ul>
                </div>}
            
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
