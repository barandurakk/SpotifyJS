import React, { useEffect } from "react";
import keys from "../../config/keys";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import axios from "axios"

//actions
//import { login } from "../../redux/asyncActions/authActions";
//Slice
import { setAuthenticated } from "../../redux/slices/authSlice";

import Loading from "../../util/Loading";

import styles from "./landing.module.scss";
import "../../scss/_global.scss";

//types
type tokenType = string;


const Landing: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { loading, authError, isAuthenticated } = useAppSelector(state => state.auth);


  useEffect(() => {
    if (isAuthenticated) {
      history.push("/profile");
    }
  }, [isAuthenticated])

  const handleAuth = async (token: tokenType) => {

    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
      dispatch(setAuthenticated());
    }
  };

  return (
    <div className={styles.container}>
      {loading ?
        (
          <Loading />
        ) :
        (
          <>
            <div className={styles.leftWrapper}></div>
            <div className={styles.rightWrapper}>
              <div className={styles.textWrapper}>
                <h1 className={styles.header}>
                  Spotify<span>JS</span>
                </h1>
                <span className={styles.description}>You can view your account analysis</span>
                <span className={styles.info}>Spotify JS will not keep any private information about your spotify profile.</span>
                {authError && <span className={styles.error}>{authError}</span>}
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
                    "user-modify-playback-state",
                    "playlist-read-private"
                  ]}
                  localStorage={true}
                  showDialog={true}
                  noCookie={true}
                  onAccessToken={(token: tokenType) => handleAuth(token)}
                  btnClassName={styles.spotifyButton}
                />
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default Landing;
