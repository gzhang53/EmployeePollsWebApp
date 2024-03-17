import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleAddQuestionAnswer } from "../actions/questions";
import Card from "react-bootstrap/Card";
import  Button  from "react-bootstrap/Button";




const QuestionPage = ({dispatch, authedUser, questions, users}) => {

  const { id } = useParams();
    const question = questions[id]
    if (question == null) {
      return <Navigate to="/Error"/>; // need to return this component instead of use navigate
    }
    const handleOptionOne = (e) => {
        e.preventDefault();
        dispatch(handleAddQuestionAnswer(question, "optionOne"));
      }
    
    const handleOptionTwo = (e) => {
        e.preventDefault();
        dispatch(handleAddQuestionAnswer(question, "optionTwo"));
      }
      
    
    const { name, avatar } = formatQuestion(question, users[question.author], authedUser);
    const VotedOptionOne = question.optionOne.votes.includes(authedUser);
  	const VotedOptionTwo = question.optionTwo.votes.includes(authedUser);
  	const Voted = VotedOptionOne || VotedOptionTwo;

	  const optionOneVotes = question.optionOne.votes.length;
	  const optionTwoVotes = question.optionTwo.votes.length;
    const votes = optionOneVotes + optionTwoVotes;
    const optionOnePercentage = Math.round(optionOneVotes/votes * 100) + "%"
    const optionTwoPercentage = Math.round(optionTwoVotes/votes * 100) + "%"

    return (

        <div className="poll-container">
        <h3 data-testid="poll-creator">Poll by {name}</h3>
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar-big" />
        <h3>Would You Rather</h3>

        <div style={{display:"flex", justifyContent:"space-between"}}>
                
                <Card style={{width:"18rem"}} border='info'>
                <Card.Text style={{width:"95%", padding:"5px"}}>{question.optionOne.text}</Card.Text>
                <Button   onClick={handleOptionOne} disabled={Voted}><p>Vote</p></Button>
                {Voted && <p>{question.optionOne.votes.length} Votes - {optionOnePercentage}</p>}
                {VotedOptionOne && <p>You chose thdis option</p>}
                </Card>

                <Card style={{width:"18rem"}}border='info' >
                <Card.Text style={{width:"95%"}} >{question.optionTwo.text}</Card.Text>
                <Button variant="primary"  onClick={handleOptionTwo} disabled={Voted}><p>Vote</p></Button>
                {Voted && <p>{question.optionTwo.votes.length} Votes - {optionTwoPercentage}</p>}
                {VotedOptionTwo && <p>You voted this option</p>}
                </Card>
            </div>
      
    </div>
    
    )

};

const mapStateToProps = ({ authedUser, users, questions }) => {
  return {
    authedUser,
    questions,
    users
  };
};

export default connect(mapStateToProps)(QuestionPage);