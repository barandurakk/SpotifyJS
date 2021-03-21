import React, { useEffect } from "react";
import { Router, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import axios from "axios";

//components
import Landing from "./pages/landing/landing";
import Profile from "./pages/profile/profile";
import NavBar from "./components/NavBar/NavBar";

//redux
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { login } from "./redux/asyncActions/authActions";


import { getLocalToken } from "./util/getLocalToken";

export const history = createBrowserHistory();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const storedToken = getLocalToken();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (storedToken) {
      dispatch(login(storedToken));
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router history={history}>
      {isAuthenticated && <NavBar />}
      <Route exact path="/" component={Landing} />
      <Route exact path="/profile" component={Profile} />
    </Router>
  );

}

export default App;
