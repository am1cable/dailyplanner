import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { loadState, saveState } from "./localStorage";
import throttle from "lodash/throttle";

const savedState = loadState();
const store = createStore(rootReducer, savedState);

store.subscribe(throttle(() => {
    saveState(store.getState());
}), 1000)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
