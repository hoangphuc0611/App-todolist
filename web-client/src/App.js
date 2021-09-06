import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ProjectDetailsScreen from "./pages/ProjectDetailsScreen";
function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Switch>
          <Route path="/project/:id" component={ProjectDetailsScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
