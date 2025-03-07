import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { quiz } from "./reducers/quiz";

import { CurrentQuestion } from "./components/CurrentQuestion";

const reducer = combineReducers({
  quiz: quiz.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <h1>Are you smarter than a 5th grader?</h1>
      <CurrentQuestion />
    </Provider>
  );
};
