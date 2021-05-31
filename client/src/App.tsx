import React, { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import axios from "axios"

//Routes
import AuthRoute from "./util/AuthRoute";

//Slice
import { setAuthenticated } from "./redux/slices/authSlice";
import { setUser } from "./redux/slices/userSlice";

//components
import Landing from "./pages/landing/landing";
import Profile from "./pages/profile/profile";
import FriendProfile from "./pages/friendProfile/FriendProfile";
import NavBar from "./components/NavBar/NavBar";

//redux
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";

import { getLocalToken } from "./util/getLocalToken";

export const history = createBrowserHistory();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const storedToken = getLocalToken();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAppSelector(state => state.auth);


  useEffect(() => {
    configureAxios();
  }, [storedToken])


  const configureAxios = () => {
    //debugger;
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    if (!storedToken) {
      setLoading(false)
      return;
    } else {
      console.log("token exist: ", storedToken);
      axios
        .post("/api/getUserDetails", { token: storedToken })
        .then((res) => {
          if (res) {
            axios.defaults.headers.common['Authorization'] = storedToken;
            dispatch(setAuthenticated());
            dispatch(setUser(res.data));
            setLoading(false)
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false)
        });
    }
  }




  return (
    <>
      {!loading ? (
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              {isAuthenticated ? <Redirect to="/profile" /> : <Landing />}
            </Route>
            <Route exact path="/profile" >
              <NavBar />
              <Profile />
            </Route>
            <Route exact path="/user/:id" >
              <NavBar />
              <FriendProfile />
            </Route>
          </Switch>

        </Router>
      ) :
        (
          <div>Loading</div>
        )
      }
    </>
  );

}

export default App;
