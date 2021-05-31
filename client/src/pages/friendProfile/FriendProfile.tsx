import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { useParams } from "react-router-dom"
import { getProfile } from "../../redux/asyncActions/userActions";
import UserDetail from "../../components/UserDetail/UserDetail";
import s from "./FriendProfile.module.scss";
import "../../scss/_global.scss";

// interface paramType {
//     id: String
// }


const FriendProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams<any>();
    const { loading, user } = useAppSelector(state => state.ui.profile)

    useEffect(() => {

        dispatch(getProfile(id))

    }, [])

    console.log(user);

    return (
        <>
            <div style={{
                backgroundImage: `url(${user.coverUrl})`
            }}
                className={s.coverContainer}>
            </div>
            <div className={s.body}>
                <div className={s.content}>
                    <div className={s.topRow}>
                        <UserDetail user={user} />
                        {/* <PlaylistList />
                  <Player /> */}
                    </div>
                    <div className={s.row}>
                        {/* <TopTracks />
                  <TopArtists />
                  <RecentTracks /> */}
                    </div>
                </div>
            </div>
        </>
    )


};

export default FriendProfile;
