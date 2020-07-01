import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import CreatingTask from "./components/CreatingTask/CreatingTask";
import ScoringTask from "./components/ScoringTask/ScoringTask";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Route exact path="/" component={CreatingTask} />
        <Route exact path="/score-task" component={ScoringTask} />
      </Router>
    </>
  );
}

export default App;
