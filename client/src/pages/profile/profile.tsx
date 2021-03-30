import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import Loading from "../../util/Loading";
//import { getCurrentTrack } from "../../redux/asyncActions/spotifyActions";

import styles from "./profile.module.scss";
import "../../scss/_global.scss";

//components
import UserDetail from "../../components/UserDetail/UserDetail";
import Player from "../../components/Player/Player";
import TopTracks from "../../components/TopTracks/TopTracks";
import TopArtists from "../../components/TopArtists/TopArtists";
import RecentTracks from "../../components/RecentTracks/RecentTracks";
import PlaylistList from "../../components/Playlist/PlaylistList";

const Profile: React.FC = (props: any) => {
  const { authError, isAuthenticated, loading } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.user);

  useEffect(() => {
    if (authError || !isAuthenticated) {
      props.history.push("/");
    }

  }, [authError, isAuthenticated])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? (
        <Loading />
      ) :
        (
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
                  {isAuthenticated && <Player />}
                </div>
                <div className={styles.row}>
                  {isAuthenticated && <TopTracks />}
                  {isAuthenticated && <TopArtists />}
                  {isAuthenticated && <RecentTracks />}
                </div>
              </div>
            </div>
          </>
        )}
    </>
  )

    ;
};

export default Profile;
