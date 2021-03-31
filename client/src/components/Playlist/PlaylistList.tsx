import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getUsersPlaylist } from "../../redux/asyncActions/spotifyActions";
import ScaleLoader from "react-spinners/ScaleLoader";

import RefreshButton from "../RefreshButton/RefreshButton";

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
            <div style={{ float: "right", margin: "10px 5px 0px 0px" }}><RefreshButton location="playlists" /></div>
            <div className={s.headerWrapper}>
                <h3>Playlists</h3>
            </div>
            <div className={s.content}>
                {playlistState.loading ? (
                    <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <ScaleLoader color="#1db954" loading={true} height={60} css="display: block;" />
                    </div>
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