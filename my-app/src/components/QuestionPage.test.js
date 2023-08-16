import React from 'react';
import QuestionPage from "./QuestionPage";
import { render } from "@testing-library/react";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser";
import { handleInitialData } from "../actions/shared";

const store = createStore(reducer, middleware);

describe("QuestionPage", () => {
    it("For answered polls, verify that the percentage of people who voted for an option is calculated and displayed correctly.", async () => {   
        await store.dispatch(setAuthedUser("tylermcginnis")); // simulate login
        await store.dispatch(handleInitialData()); // async/await is needed otherwise the state will not be initialized 

        const authedUser = store.getState().authedUser;
        const questions = store.getState().questions;
        const answeredPolls = store.getState().users[authedUser].answers;

        const answerId = Object.keys(answeredPolls)[0];
        const optionOneVotes = questions[answerId].optionOne.votes.length;
        const optionTwoVotes = questions[answerId].optionTwo.votes.length;
        const totalVotes = optionOneVotes + optionTwoVotes;
        const optionOneText = "Votes: " + optionOneVotes.toString() + " (" + Math.round(100 * optionOneVotes/totalVotes) +  "%)";
        const optionTwoText = "Votes: " + optionTwoVotes.toString() + " (" + Math.round(100 * optionTwoVotes/totalVotes) +  "%)";

        // reference: https://medium.com/@bobjunior542/using-useparams-in-react-router-6-with-jest-testing-a29c53811b9e
        const component = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/questions/${answerId}`]}>
                    <Routes>
                        <Route path="/questions/:id" element={<QuestionPage />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );
        expect(component).toBeDefined();
        expect(component.getByTestId('poll-header')).toBeInTheDocument();
        expect(component.getByTestId('optionOne')).toBeInTheDocument();
        expect(component.getByTestId('optionTwo')).toBeInTheDocument();
        expect(component.getByTestId('optionOne').textContent).toEqual(optionOneText);
        expect(component.getByTestId('optionTwo').textContent).toEqual(optionTwoText);
    });
});
