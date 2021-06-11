import React, { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getCurrentTrack, playCurrentTrack, stopCurrentTrack } from "../../redux/asyncActions/spotifyActions";

import ProgressBar from "../ProgressBar/ProgressBar";
import RefreshButton from "../RefreshButton/RefreshButton";

import styles from "./Player.module.scss";


const Player: React.FC<any> = ({ player }: any) => {
    const dispatch = useAppDispatch();
    //const player = useAppSelector(state => state.spotify.currentTrack);
    const [isPlaying, setIsPlaying] = useState(player.isPlaying ? false : true)

    useEffect(() => {
        dispatch(getCurrentTrack());

    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {

        setIsPlaying(player.isPlaying);

    }, [player.isPlaying])// eslint-disable-line react-hooks/exhaustive-deps

    const handlePause = async () => {
        setIsPlaying(false);
        dispatch(stopCurrentTrack());
    }

    const handlePlay = async () => {
        setIsPlaying(true);
        dispatch(playCurrentTrack());
    }

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${player.trackImg})` }}>
            <div className={styles.topBar}>
                Currently listening...
                <RefreshButton location={"player"} />
            </div>
            <div className={styles.content}>
                {!player.trackType ? (
                    <h4 className={styles.errorMessage}>This user currenly not listening any track. <br /> Try refreshing!</h4>
                ) : player.loading ?

                    (<div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <ScaleLoader color="#1db954" loading={true} height={60} css="display: block;" />
                    </div>
                    ) : (
                        <>
                            <a href={player.trackUrl} className={styles.trackName} target={"_blank"}>
                                {player.trackName.length > 40 ? `${player.trackName.slice(0, 38)}...` : `${player.trackName}`}
                            </a>
                            <div className={styles.artistsWrapper}>
                                {player.trackArtists.map((artist: any, i: number) => {
                                    if (i === player.trackArtists.length - 1) {
                                        return <a target={"_blank"} href={artist.external_urls.spotify} key={i}><span>{artist.name}</span></a>
                                    } else {
                                        return <a target={"_blank"} href={artist.external_urls.spotify} key={i}><span>{artist.name} - </span></a>
                                    }
                                })}
                            </div>
                            {!player.isFriend && (
                                <div className={styles.playerWrapper}>
                                    {isPlaying ?
                                        (
                                            <span
                                                onClick={() => handlePause()}
                                                className={styles.playerIcon}
                                            ><i className="fas fa-pause"></i></span>
                                        ) : (
                                            <span
                                                onClick={() => handlePlay()}
                                                className={styles.playerIcon}
                                            ><i className="fas fa-play"></i></span>
                                        )}
                                    <ProgressBar progress={player.progress} duration={player.duration} backgroundColor={"#121212"} progressColor={"#1db954"} width={10} />
                                </div>
                            )}

                        </>
                    )}
            </div>
        </div>
    )
}

export default Player;