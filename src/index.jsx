import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Router, Route, Link, HashRouter } from "react-router-dom";
import "antd/dist/antd.css";
import * as reducers from "./common/redux/ducks/reducers";
import "./../node_modules/bulma/css/bulma.css";
import store from "./common/redux/store";
import Body from "./common/App/Body";

const Root = () => (
  <AppContainer>
    <Provider store={store}>
      <HashRouter>
        <Body />
      </HashRouter>
    </Provider>
  </AppContainer>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<Root />, rootElement);
if (module.hot) {
  module.hot.accept("./common/App/App", () => {
    render(<Root />, rootElement);
  });
}
