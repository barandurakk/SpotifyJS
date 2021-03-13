import React from "react";
import { Router, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import axios from "axios";

//components
import Landing from "./pages/landing";
import Profile from "./pages/profile";

export const history = createBrowserHistory();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

const App:React.FC = () =>  {
  
    return (
      <Router history={history}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/profile" component={Profile} />
      </Router>
    );
  
}

export default App;
