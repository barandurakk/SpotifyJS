import React, {useEffect} from "react";
import { Router, Route } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import axios from "axios";

//components
import Landing from "./pages/landing/landing";
import Profile from "./pages/profile/profile";
import NavBar from "./components/NavBar/NavBar";

//redux
import { fetchCurrentUser } from "./actions/index";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";

export const history = createBrowserHistory();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

const App:React.FC = () =>  {
  const dispatch = useAppDispatch(); 
  const storedToken = localStorage.getItem("spotifyAuthToken");
  const {isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    if(storedToken){
      dispatch(fetchCurrentUser(storedToken));
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps
  
    return (
      <Router history={history}>
        {isAuthenticated && <NavBar/>}
        <Route exact path="/" component={Landing} />
        <Route exact path="/profile" component={Profile} />
      </Router>
    );
  
}

export default App;
