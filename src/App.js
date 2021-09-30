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
  useHistory,
  Redirect,
} from "react-router-dom";

const App = () => {
  let connected = IsConnected(Cookies.get("status"), Cookies.get("email"));

  if (connected) {
    return (
      <Router>
        <Switch>
          <Route path="/dashboard/coursecloud">
            <DashboardPage items={["coursecloud"]} />
          </Route>
          <Route path="/dashboard/graph">
            <DashboardPage items={["graph"]} />
          </Route>
          <Route path="/dashboard/overview">
            <DashboardPage items={["overview"]} />
          </Route>
          {/* <Route path="/profile">
            <DashboardPage />
          </Route> */}
          <Route
            path="*"
            exact ={true}
          >
            <DashboardPage items={["overview", "graph", "coursecloud"]} />
            <Redirect from="*" to="/dashboard" />
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
