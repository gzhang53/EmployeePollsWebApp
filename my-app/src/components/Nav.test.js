import React from 'react';
import Nav from "./Nav";
import { render } from "@testing-library/react";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser";

const store = createStore(reducer, middleware);

describe("Nav", () => {
    it("navigation bar displays all expected links", async () => {   
        await store.dispatch(setAuthedUser("tylermcginnis")); // simulate login
        const authedUser = store.getState().authedUser;
        const component = render(
            <Provider store={store}>
                <Router>
                    <Nav/>
                </Router>
            </Provider>
        );

        expect(component.getByTestId("home").textContent).toBe("Home");
        expect(component.getByTestId("new-poll").textContent).toBe("New Poll");
        expect(component.getByTestId("leaderboard").textContent).toBe("Leaderboard");
        expect(component.getByTestId("authedUser").textContent).toBe("User: " + authedUser);
        expect(component.getByTestId("logout").textContent).toBe("Logout");
    });
});
