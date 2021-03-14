import React,{useEffect} from "react";
import keys from "../../config/keys";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import ScaleLoader from "react-spinners/ScaleLoader";

//actions
import { fetchCurrentUser } from "../../actions/index";

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
        await dispatch(fetchCurrentUser(token));
        props.history.push("/profile");  
    }
  };
  return (  
    <div className={styles.container}>
      {loading ? 
      (
        <div className="loading-container">
           <ScaleLoader color="#1db954" loading={true} height={60} css="display: block;" />
          </div>
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
