import "./App.css";

import LoginPage from "./components/Pages/LoginPage";
import DashboardPage from "./components/Pages/DashboardPage";
import ForumPage from "./components/Pages/ForumPage";
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

const App = () => {
  let connected = IsConnected(
    Cookies.get("status"),
    Cookies.get("email"),
    Cookies.get("password")
  );

  if (connected) {
    return (
      <Router>
        <Switch>
          <Route path="/profile">
            <DashboardPage items={["profile"]} />
          </Route>
          <Route path="/utils/forum">
            <DashboardPage items={["forum"]} />
          </Route>
          <Route path="/manage/add">
            <DashboardPage items={["add"]} />
          </Route>
          <Route path="/manage/modify">
            <DashboardPage items={["modify"]} />
          </Route>
          <Route path="/manage/delete">
            <DashboardPage items={["delete"]} />
          </Route>
          <Route path="/dashboard/coursecloud">
            <DashboardPage items={["coursecloud"]} />
          </Route>
          <Route path="/dashboard/graph">
            <DashboardPage items={["graph"]} />
          </Route>
          <Route path="/dashboard/overview">
            <DashboardPage items={["overview"]} />
          </Route>
          <Route path="/dashboard">
            <DashboardPage items={["graph", "coursecloud", "overview"]} />
          </Route>
          <Route path="/manage">
            <DashboardPage items={["add", "modify", "delete"]} />
          </Route>
          <Route path="*" exact={true}>
            <DashboardPage items={["overview"]} />
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
          <Route path="*" exact={true}>
            <LoginPage />
            <Redirect from="*" to="/login" />
          </Route>
        </Switch>
      </Router>
    );
  }
};

export default App;
