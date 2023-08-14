import React from 'react';
import Leaderboard from "./Leaderboard";
import { render, within } from "@testing-library/react";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { handleInitialData } from "../actions/shared";

const store = createStore(reducer, middleware);

describe("Leaderboard", () => {
    it("leaderboard is displaying the correct user name, number of questions asked, and number of questions answered", async () => {   
        
        // reference: https://akoskm.com/test-complex-dom-structures-with-react-testing-library
        const checkRowContents = (row, name, answered, created) => {
            const columns = within(row).getAllByRole('cell');
            expect(columns).toHaveLength(3);
            expect(columns[0]).toHaveTextContent(name);
            expect(columns[1]).toHaveTextContent(answered);
            expect(columns[2]).toHaveTextContent(created);
          }

        await store.dispatch(handleInitialData()); // async/await is needed otherwise the state will not be initialized 
        const component = render(
            <Provider store={store}>
                <Router>
                    <Leaderboard/>
                </Router>
            </Provider>
        );

        const users = store.getState().users;
        const users_sorted = Object.values(users).sort((a, b) => Object.keys(b.answers).length + Object.keys(b.questions).length - Object.keys(a.answers).length - Object.keys(a.questions).length);
        
        const table = component.getByRole('table');
        const tbody = within(table).getAllByRole('rowgroup')[1];
        const rows = within(tbody).getAllByRole('row');
        expect(rows).toHaveLength(users_sorted.length);
        
        users_sorted.forEach((user, index) => {
            checkRowContents(rows[index], user.name, Object.keys(user.answers).length, Object.keys(user.questions).length);
        });
    });
});
