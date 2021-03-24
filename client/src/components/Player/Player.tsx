import React, { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getCurrentTrack } from "../../redux/asyncActions/spotifyActions";

import PlayerProgressBar from "./PlayerProgressBar";
import RefreshButton from "../RefreshButton/RefreshButton";

import styles from "./Player.module.scss";


const Player: React.FC = () => {
    const dispatch = useAppDispatch();
    const player = useAppSelector(state => state.spotify.currentTrack);
    const [isPlaying, setIsPlaying] = useState(player.isPlaying ? false : true)

    useEffect(() => {

        dispatch(getCurrentTrack());

    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {

        setIsPlaying(player.isPlaying);

    }, [player.isPlaying])// eslint-disable-line react-hooks/exhaustive-deps

    const handlePause = async () => {

        setIsPlaying(false);
    }

    const handlePlay = async () => {

        setIsPlaying(true);
    }

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${player.trackImg})` }}>
            <div className={styles.topBar}>
                Currently listening...
                <RefreshButton location={"player"} />
            </div>
            <div className={styles.content}>
                {player.loading ?
                    (<div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <ScaleLoader color="#1db954" loading={true} height={60} css="display: block;" />
                    </div>
                    ) : (
                        <>
                            <a href={player.trackUrl} className={styles.trackName}>
                                {player.trackName.length > 40 ? `${player.trackName.slice(0, 38)}...` : `${player.trackName}`}
                            </a>
                            <div className={styles.artistsWrapper}>
                                {player.trackArtists.map((artist, i) => {
                                    if (i === player.trackArtists.length - 1) {
                                        return <a href={artist.external_urls.spotify} key={i}><span>{artist.name}</span></a>
                                    } else {
                                        return <a href={artist.external_urls.spotify} key={i}><span>{artist.name} - </span></a>
                                    }
                                })}
                            </div>
                            <div className={styles.playerWrapper}>
                                {isPlaying ?
                                    (
                                        <span
                                            onClick={() => handlePause()}
                                        ><i className="fas fa-pause"></i></span>
                                    ) : (
                                        <span
                                            onClick={() => handlePlay()}
                                        ><i className="fas fa-play"></i></span>
                                    )}
                                <PlayerProgressBar progress={player.progress} duration={player.duration} />
                            </div>
                        </>
                    )}
            </div>
        </div>
    )
}

export default Player;