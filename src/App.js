import "./App.css";

import LoginPage from "./components/Pages/LoginPage";
import DashboardPage from "./components/Pages/DashboardPage";
import LoadingPage from "./components/Pages/LoadingPage";
import IsConnected from "./hooks/isConnected";
import Cookies from 'js-cookie'

const App = () => {
  let connected = IsConnected(Cookies.get("status"),Cookies.get("email"))
  
  if (connected) {
    return <DashboardPage/>
  }
  else if (connected === undefined){
    return <LoadingPage/>
  }
  else{
    return <LoginPage/>
  };
};

export default App;
