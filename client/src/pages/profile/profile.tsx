import React, { useEffect } from "react";
import Loading from "../../util/Loading";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getLocalToken } from "../../util/getLocalToken";
import { getCurrentUser } from "../../redux/asyncActions/userActions";

import styles from "./profile.module.scss";
import "../../scss/_global.scss";

//components
import UserDetail from "../../components/UserDetail/UserDetail";
import Player from "../../components/Player/Player";
import TopTracks from "../../components/TopTracks/TopTracks";
import TopArtists from "../../components/TopArtists/TopArtists";
import RecentTracks from "../../components/RecentTracks/RecentTracks";
import PlaylistList from "../../components/Playlist/PlaylistList";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const storedToken = getLocalToken();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.user);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }

  }, [isAuthenticated])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>


      <div style={{
        backgroundImage: `url(${user.coverUrl})`
      }}
        className={styles.coverContainer}>
      </div>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.topRow}>
            <UserDetail user={user} />
            <PlaylistList />
            <Player />
          </div>
          <div className={styles.row}>
            <TopTracks />
            <TopArtists />
            <RecentTracks />
          </div>
        </div>
      </div>


    </>
  )

    ;
};

export default Profile;
