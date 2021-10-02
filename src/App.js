import "./App.css";

import LoginPage from "./components/Pages/LoginPage";
import DashboardPage from "./components/Pages/DashboardPage";
import LoadingPage from "./components/Pages/LoadingPage";
import IsConnected from "./hooks/isConnected";
import Cookies from "js-cookie";
import React from "react";
import Page from "./components/Pages/Page";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ReviewPage from "./components/Pages/ReviewPage";

const App = () => {
  let connected = IsConnected(Cookies.get("status"), Cookies.get("email"), Cookies.get("password"));

  if (connected) {
    return (
      <Router>
        <Switch>
          <Route path="/dashboard/coursecloud">
            <DashboardPage status = {Cookies.get("status")} items={["coursecloud"]} />
          </Route>
          <Route path="/dashboard/review">
            <ReviewPage />
          </Route>
          <Route path="/dashboard/graph">
            <DashboardPage status = {Cookies.get("status")}  items={["graph"]} />
          </Route>
          <Route path="/dashboard/overview">
            <DashboardPage status = {Cookies.get("status")}  items={["overview"]} />
          </Route>
          {/* <Route path="/profile">
            <DashboardPage />
          </Route> */}
          <Route
            path="*"
            exact ={true}
          >
            <DashboardPage status = {Cookies.get("status")} items={["overview"]} />
            <Redirect from="*" to="/dashboard/overview" />
          </Route>
        </Switch>
      </Router>
    );
  } else if (connected === undefined) {
    return <LoadingPage />;
  } else {
    return (
      
      <Router>
        <Switch>
          <Route path="/register">
            <Page />
          </Route>
          <Route
            path="*"
            exact ={true}
          >
            <LoginPage />
            <Redirect from="*" to="/login" />
          </Route>
        </Switch>
      </Router>
    );
  }
};

export default App;
