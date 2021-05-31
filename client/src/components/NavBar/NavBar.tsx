import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import RefreshButton from "../RefreshButton/RefreshButton";
import styles from "./NavBar.module.scss";
import { logout } from "../../redux/asyncActions/authActions";
import { useHistory } from "react-router-dom";

import Search from "../Search/Search";
import Notification from "../Notification/Notification";
import FriendList from "../Friends/FriendList";

//global styles 
import "../../scss/_global.scss";

const NavBar: React.FC = () => {
  const { user } = useAppSelector(state => state.user);
  const { loading } = useAppSelector(state => state.auth);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  }

  return <div className={styles.container}>
    {loading ? (
      <span>Loading</span>
    ) : (
      <>
        <div className={styles.brandingWrapper}>
          <h1>SpotifyJS</h1>
        </div>

        <div className={styles.userActions}>
          <div className={styles.searchWrapper}>
            <Search />
          </div>
          <RefreshButton location={"profile"} />
          <Link to="/profile">
            <span className={styles.userName}>
              {user.displayName}
            </span>
          </Link>
          <div className={styles.notificationWrapper}>
            <Notification />
          </div>
          <div className={styles.friendsWrapper}>
            <FriendList />
          </div>
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
