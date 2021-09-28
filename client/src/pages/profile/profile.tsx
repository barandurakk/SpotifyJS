import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getLocalToken } from "../../util/getLocalToken";
import { getUsersPlaylist, getCurrentTrack } from "../../redux/asyncActions/spotifyActions";

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
  const playlistState = useAppSelector(state => state.spotify.playlists);
  const { user } = useAppSelector(state => state.user);
  const history = useHistory();
  const playlists = playlistState.playlistList;
  const player = useAppSelector(state => state.spotify.currentTrack)

  useEffect(() => {

    dispatch(getUsersPlaylist())
    dispatch(getCurrentTrack());

  }, [])

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
            <PlaylistList playlists={playlists} />
            <Player player={player} />
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
