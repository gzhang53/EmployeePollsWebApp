import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const NewQuestion = ({dispatch, authedUser}) => {
  const navigate = useNavigate();
  const [optionOne, setoptionOne] = useState("");
  const [optionTwo, setoptionTwo] = useState("");

  const handleChangeOptionOne = (e) => {
    const text = e.target.value;
    setoptionOne(text);
  };

  const handleChangeOptionTwo = (e) => {
    const text = e.target.value;
    setoptionTwo(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleAddQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    }));
    setoptionOne("");
    setoptionTwo("");
    navigate("/");
  };

  return (
    <div>
      <h1 className="center">Would You Rather</h1>
      <p className="center">Create Your Own Poll</p>
     
      <form className="new-question" onSubmit={handleSubmit}>
                <h3 className="center">Option One</h3>
                <textarea data-testid="option-one" placeholder="Option One" className="textarea" value={optionOne} onChange={handleChangeOptionOne} maxLength={280}/>
                
                <h3 className="center">Option Two</h3>
                <textarea data-testid="option-two" placeholder="Option Two" className="textarea" value={optionTwo} onChange={handleChangeOptionTwo}  maxLength={280}/>

                <button data-testid="submit-button" style={{borderColor:'black'}} className="btn" type="submit" disabled={optionOne === "" || optionTwo === ""}>Submit</button>
            </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser
});

export default connect(mapStateToProps)(NewQuestion);