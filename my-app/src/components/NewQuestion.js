import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const NewQuestion = ({dispatch, authedUser}) => {
  const navigate = useNavigate();
  const [optionOne, setoptionOne] = useState("");
  const [optionTwo, setoptionTwo] = useState("");

  const handleoptionOne = (e) => {
    const text = e.target.value;
    setoptionOne(text);
  };

  const handleoptionTwo = (e) => {
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
        {/* todo: Redirect to / if submitted */}
        <h3 className="center">First Option</h3>
        <textarea
          data-testid="option-one"
          placeholder="Option One"
          value={optionOne}
          onChange={handleoptionOne}
          className="textarea"
          maxLength={280}
        />
        <h3 className="center">Second Option</h3>
        <textarea
          data-testid="option-two"
          placeholder="Option Two"
          value={optionTwo}
          onChange={handleoptionTwo}
          className="textarea"
          maxLength={280}
        />
        <button data-testid="submit-button" className="btn" type="submit" disabled={optionOne === "" || optionTwo === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser
});

export default connect(mapStateToProps)(NewQuestion);