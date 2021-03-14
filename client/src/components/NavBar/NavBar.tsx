import React from "react";
import {useAppSelector, useAppDispatch} from "../../hooks/reduxHooks";
import styles from "./NavBar.module.scss";
import {logoutUser} from "../../reducers/authReducer";

//global styles 
import "../../scss/_global.scss";

const NavBar:React.FC = () => {
  const {user, loading} = useAppSelector(state=> state.auth); 
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  } 

  return <div className={styles.container}> 
  {loading ? (
      <span>Loading</span>
  ) : (
    <>
      <div className={styles.brandingWrapper}>
          <h1>SpotifyJS</h1>
      </div>
      <div  className={styles.userActions}>
        <span className={styles.userName}>
          {user.displayName}
        </span>
        <button
        className={styles.logoutButton}
          onClick={() => handleLogout()}
        >Logout</button>
      </div>
    </>
  )}  
  </div>;
};

export default NavBar;
