import React from 'react';
import NewQuestion from "./NewQuestion";
import { render, fireEvent } from "@testing-library/react";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(reducer, middleware);

describe("NewQuestion", () => {
    it("poll submit button should be enabled when both option fields contain text", () => {
        const component = render(
            <Provider store={store}>
                <Router>
                    <NewQuestion/>
                </Router>
            </Provider>
        );
       
        var optionOne = component.getByTestId("option-one");
        var optionTwo = component.getByTestId("option-two");
        fireEvent.change(optionOne, {target: {value: "optionOne"}});
        fireEvent.change(optionTwo, {target: {value: "optionTwo"}});
        expect(optionOne.value).toEqual("optionOne");
        expect(optionTwo.value).toEqual("optionTwo");
        expect(component.getByTestId("submit-button")).not.toBeDisabled();
    });
});
