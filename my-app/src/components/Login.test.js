import React from 'react';
import Login from './Login';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import { render,fireEvent } from "@testing-library/react";

const store = createStore(reducer, middleware);

describe('LogIn', ()=>{it("username, password, and submit button should be on login page", () => {
    const component = render(
        <Provider store={store}>
            <Router>
                <Login/>
            </Router>
        </Provider>
    );
    expect(component.getByTestId("username")).toBeInTheDocument();
    expect(component.getByTestId("password")).toBeInTheDocument();
    expect(component.getByTestId("submit")).toBeInTheDocument();
})

it("wrong username, password lead to failed login",()=>{

    const component = render(
        <Provider store={store}>
            <Router>
                <Login/>
            </Router>
        </Provider>
    );
    var usernameInput = component.getByTestId('username');
    fireEvent.change(usernameInput, { target: { value: 'tylermcginnis' } });

    var passwordInput = component.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: 'abc321' } });

    var submitButton = component.getByTestId('submit');
    fireEvent.click(submitButton);
        
    expect(component.getByTestId('error-message')).toBeInTheDocument();





})});