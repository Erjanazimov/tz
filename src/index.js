import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./store/storeSlice"
import {BrowserRouter} from "react-router-dom";
import "./App.css";

ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

