import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ProjectDetailsScreen from "./pages/ProjectDetailsScreen";
import LoginScreen from './pages/LoginScreen';
import Footer from "./components/Footer";
function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/project/:id" component={ProjectDetailsScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/" component={HomeScreen} exact />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
