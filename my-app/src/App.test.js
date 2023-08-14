import React from 'react';
import App from './App';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import reducer from "./reducers";
import middleware from "./middleware";
import { createStore } from "redux";
import { render } from "@testing-library/react";

const store = createStore(reducer, middleware);

describe("App.js", () => {
  it("should render App component", () => {
      const component = render(
          <Provider store={store}>
              <Router>
                  <App/>
              </Router>
          </Provider>
      );
      expect(component).toBeDefined();
      expect(component).toMatchSnapshot();
  });
});