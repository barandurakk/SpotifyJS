import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getRecentTracks } from "../../redux/asyncActions/spotifyActions";

import s from "./RecentTracks.module.scss";

import ProgressBar from "../ProgressBar/ProgressBar";
import RefreshButton from "../RefreshButton/RefreshButton";
import ScaleLoader from "react-spinners/ScaleLoader";


const RecentTracks: React.FC = () => {
    const dispatch = useAppDispatch();
    const recentTracks = useAppSelector(state => state.spotify.recentTracks);
    const tracks = recentTracks.recentList;

    useEffect(() => {

        dispatch(getRecentTracks());

    }, [])
    return (
        <div className={s.container}>
            <div style={{ float: "right" }}><RefreshButton location="recentTracks" /></div>

            <div className={s.headerWrapper}>
                <h3>Recently Played</h3>
            </div>
            <div className={s.content}>
                {recentTracks.loading ? (
                    <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <ScaleLoader color="#1db954" loading={true} height={60} css="display: block;" />
                    </div>
                ) : (
                    tracks.map(track => {
                        return (
                            <div className={s.listItem} key={track.id}>
                                <a target={"_blank"} href={track.url}><div className={s.image} style={{ backgroundImage: `url(${track.imageUrl})` }}></div></a>
                                <div className={s.itemContent}>
                                    <div>
                                        <div className={s.name}> <a target={"_blank"} href={track.url}>{track.name}</a></div>
                                        <div className={s.artistsWrapper}>
                                            {track.artists.map((artist, i) => {
                                                if (i === track.artists.length - 1) {
                                                    return <a href={artist.url} target={"_blank"} key={i}><span>{artist.name}</span></a>
                                                } else {
                                                    return <a href={artist.url} target={"_blank"} key={i}><span>{artist.name} - </span></a>
                                                }
                                            })}
                                        </div>
                                    </div>
                                    <div>
                                        <span className={s.popularityTag}>Popularity</span>
                                        <ProgressBar progress={track.popularity}
                                            duration={100}
                                            width={3}
                                            backgroundColor={"#121212"}
                                            progressColor={"#1db954"} />
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

export default RecentTracks;