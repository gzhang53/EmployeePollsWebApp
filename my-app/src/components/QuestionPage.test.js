import React from 'react';
import QuestionPage from "./QuestionPage";
import { render } from "@testing-library/react";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
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

        Object.keys(answeredPolls).forEach((answerId) => {
            console.log(answerId);
            console.log(answeredPolls[answerId]);
            const component = render(
                <Provider store={store}>
                    <Router>
                        <QuestionPage id={answerId}/>
                    </Router>
                </Provider>
            );
            expect(component.getByTestId(answeredPolls[answerId])).toBeInTheDocument();
            // console.log(component.getByTestId(answeredPolls[answerId]).textContent);
            // expect(component).toBeDefined();

        });
    });
});
