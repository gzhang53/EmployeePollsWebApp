import React from 'react';
import Navigation from "./Navigation";
import { render } from "@testing-library/react";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser";
import { receiveUsers } from '../actions/users';
import { handleInitialData } from "../actions/shared";
import authedUser from '../reducers/authedUser';
const store = createStore(reducer, middleware);

describe("Navigation", () => {
    it("navigation bar displays all expected links", async () => {   

        await store.dispatch(setAuthedUser("tylermcginnis")); 
        const authedUser = store.getState().authedUser;


        const component = render(
            <Provider store={store}>
                <Router>
                    <Navigation/>
                </Router>
            </Provider>
        );
        
        expect(component.getByTestId("home")).toHaveTextContent("Home");
        expect(component.getByTestId("new-poll")).toHaveTextContent("New");
        expect(component.getByTestId("leaderboard")).toHaveTextContent("Leaderboard");
        expect(component.getByTestId("authedUser")).toHaveTextContent("tylermcginnis");
        expect(component.getByTestId("logout")).toHaveTextContent("Logout");
    });
});
