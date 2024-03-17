import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Moment from "moment";


const Question = (props) => {
  if (props.question === null) {
    return <p>This Question doesn't exist</p>;
  }

  const { name,avatar,id} =
    props.question;
  const date = new Date(props.question.timestamp);
  return (
    
    <Link to={`/questions/${id}`} className="question">
    <Card style={{width:"18 rem"}}>
        <Card.Body>
          
          <Card.Title>{name}</Card.Title>
          
          <Card.Text>{Moment(date).format("hh:mm A | MM/DD/YYYY")}</Card.Text>
          
          <div style={{display:"flex",justifyContent:"center"}}>
          <Button   className="show-question" variant="primary">Show</Button>
          </div>
        </Card.Body>
    </Card>
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
