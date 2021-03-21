import React,{useEffect} from "react";
import keys from "../../config/keys";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import Loading from "../../util/Loading";

//actions
import { login } from "../../redux/asyncActions/index";

import styles from "./landing.module.scss";
import  "../../scss/_global.scss";

//types
type tokenType = string;


const Landing:React.FC = (props:any) => {
  const dispatch = useAppDispatch(); 
  const {loading, authError, isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    if(isAuthenticated){
      props.history.push("/profile");
   }
  }, [isAuthenticated])// eslint-disable-line react-hooks/exhaustive-deps


  const handleAuth = async (token:tokenType) => {
    
    if (token) {
        await dispatch(login(token));
        props.history.push("/profile");  
    }
  };
  return (  
    <div className={styles.container}>
      {loading ? 
      (
        <Loading/>
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
            ]}
            localStorage={true}
            showDialog={true}
            noCookie={true}
            onAccessToken={(token:tokenType) => handleAuth(token)}
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
