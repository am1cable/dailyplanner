import React from "react";
import Pages from "./pages/pages";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";

export const App = () => (
  <div className="daily-planner">
    <Router>
    <Pages />
  </Router>
  </div>
);

export default App;