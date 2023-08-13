import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function addQuestionAnswer({id, option, authedUser}) {
  return {
    type: ADD_QUESTION_ANSWER,
    id,
    option,
    authedUser
  };
}

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    dispatch(showLoading());

    return saveQuestion(question)
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddQuestionAnswer(question, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    
    dispatch(showLoading());

    return saveQuestionAnswer({
      authedUser,
      qid: question.id,
      answer,
    })
    .then(() => dispatch(addQuestionAnswer({
      id: question.id,
      option: answer,
      authedUser
    })))
    .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
