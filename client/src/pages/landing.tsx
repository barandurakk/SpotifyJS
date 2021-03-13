import React,{useEffect} from "react";
import keys from "../config/keys";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";

//actions
import { fetchCurrentUser } from "../actions/index";

import "../scss/landing.scss";

//types:
type tokenType = string;

const Landing:React.FC = (props:any) => {
  const dispatch = useAppDispatch(); 
  const user = useAppSelector(state => state.data.user);
  const authError = useAppSelector(state => state.data.authError);
  const storedToken = localStorage.getItem("spotifyAuthToken")

  useEffect(() => {
    if(user.id){
      props.history.push("/profile");
    }else if(storedToken){
      dispatch(fetchCurrentUser(storedToken));
    }
  }, [user])// eslint-disable-line react-hooks/exhaustive-deps


  const handleAuth = async (token:tokenType) => {
    if (token) {
        await dispatch(fetchCurrentUser(token));
        props.history.push("/profile");  
    }
  };

  return (
    <div className="landing-container">
      <div className="leftSide-wrapper"></div>
      <div className="rightSide-wrapper">
        <div className="welcome-header-wrapper">
          <h1>
            Spotify<span>JS</span>
          </h1>
          <span>You can view your account analysis</span>
          {authError && <span className="loginError">{authError}</span>}         
        </div>
        <SpotifyAuth
          redirectUri="http://localhost:3000/"
          clientID={keys.default.spotifyClientID}
          scopes={[
            Scopes.userReadPrivate,
            "user-read-email",
            "user-top-read",
            "user-read-recently-played",
            "user-read-currently-playing",
            "user-follow-read",
          ]}
          localStorage={true}
          showDialog={true}
          noCookie={true}
          onAccessToken={(token:tokenType) => handleAuth(token)}
          btnClassName="spotify-button"
          logoClassName="spotify-logo"
        />
      </div>
    </div>
  );
};

export default Landing;
