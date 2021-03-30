import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getUsersPlaylist } from "../../redux/asyncActions/spotifyActions";

import s from "./PlaylistList.module.scss";

const PlaylistList: React.FC = () => {
    const dispatch = useAppDispatch();
    const playlistState = useAppSelector(state => state.spotify.playlists);
    const playlists = playlistState.playlistList;

    useEffect(() => {

        dispatch(getUsersPlaylist())

    }, [])

    return (
        <div className={s.container}>
            <div className={s.headerWrapper}>
                <h3>Playlists</h3>
            </div>
            <div className={s.content}>
                {playlistState.loading ? (
                    <div>Loading...</div>
                ) : (
                    playlists.map(playlist => {
                        return (
                            <div className={s.listItem} key={playlist.id}>
                                <a target={"_blank"} href={playlist.url}><div className={s.image} style={{ backgroundImage: `url(${playlist.imageUrl})` }}></div></a>
                                <div className={s.itemContent}>
                                    <div>
                                        <div className={s.name}> <a target={"_blank"} href={playlist.url}>{playlist.name}</a></div>
                                        <div className={s.description}>{playlist.description}</div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div >
    )
}

export default PlaylistList;