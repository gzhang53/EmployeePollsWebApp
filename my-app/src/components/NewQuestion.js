import { useState } from "react";

const NewQuestion = () => {
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

    // todo: Add Question to store
    console.log("Option one: ", optionOne);
    console.log("Option two: ", optionTwo);
    setoptionOne("");
    setoptionTwo("");
  };

  return (
    <div>
      <h1 className="center">Would You Rather</h1>
      <p className="center">Create Your Own Poll</p>
      <form className="new-question" onSubmit={handleSubmit}>
        {/* todo: Redirect to / if submitted */}
        <h3 className="center">First Option</h3>
        <textarea
          placeholder="Option One"
          value={optionOne}
          onChange={handleoptionOne}
          className="textarea"
          maxLength={280}
        />
        <h3 className="center">Second Option</h3>
        <textarea
          placeholder="Option Two"
          value={optionTwo}
          onChange={handleoptionTwo}
          className="textarea"
          maxLength={280}
        />
        <button className="btn" type="submit" disabled={optionOne === "" || optionTwo === ""}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewQuestion;
