import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { useParams } from "react-router-dom"
import { getProfile, sendRequest } from "../../redux/asyncActions/userActions";
import FriendDetail from "../../components/FriendDetail/FriendDetail";
import s from "./FriendProfile.module.scss";
import "../../scss/_global.scss";
import PlaylistList from "../../components/Playlist/PlaylistList";
import { getUsersPlaylist } from "../../redux/asyncActions/spotifyActions";

const FriendProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<any>();
    const { user, playlists, isFriend } = useAppSelector(state => state.ui.profile)
    const [reqSended, setReqSended] = useState<any>(false);

    useEffect(() => {

        dispatch(getProfile(id))
        dispatch(getUsersPlaylist())

    }, [])

    const sendFriendReq = () => {
        dispatch(sendRequest(user.spotifyId))
        setReqSended(true);
    }

    console.log(user);

    return (
        <>
            <div style={{
                backgroundImage: `url(${user.coverUrl})`
            }}
                className={s.coverContainer}>
            </div>
            <div className={s.body}>
                {isFriend ? (
                    <div className={s.content}>
                        <div className={s.topRow}>
                            <FriendDetail user={user} />
                            <PlaylistList playlists={playlists} />
                            {/* <Player />  */}
                        </div>
                        <div className={s.row}>
                            {/* <TopTracks />
                        <TopArtists />
                        <RecentTracks /> */}
                        </div>
                    </div>
                ) : (
                    <div className={s.content}>
                        <div className={s.topRow}>
                            <FriendDetail user={user} />
                            <div className={s.nonFriendDiv}>
                                <span>To see music each other music taste, you have to be friends!</span>
                                {reqSended ? (
                                    <span>Request Sended!</span>
                                ) : (
                                    <button onClick={sendFriendReq}>Send Friend Request!</button>
                                )}
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </>
    )


};

export default FriendProfile;

