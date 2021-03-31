import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getTopDetails } from "../../redux/asyncActions/spotifyActions";
import ScaleLoader from "react-spinners/ScaleLoader";

import s from "./TopTracks.module.scss";

import ProgressBar from "../ProgressBar/ProgressBar";


const TopTracks: React.FC = () => {
    const dispatch = useAppDispatch();


    const topTracks = useAppSelector(state => state.spotify.topTracks);
    const shortTermTracks = topTracks.trackList.short_term;
    const mediumTermTracks = topTracks.trackList.medium_term;
    const longTermTracks = topTracks.trackList.long_term;

    const [term, setTerm] = useState(mediumTermTracks);

    useEffect(() => {

        dispatch(getTopDetails("tracks"));

    }, [])

    useEffect(() => {

        setTerm(mediumTermTracks);

    }, [topTracks])
    return (
        <div className={s.container}>
            <div className={s.headerWrapper}>
                <h3>Top Tracks</h3>
                <div className={s.actionButtons}>
                    <button onClick={() => setTerm(shortTermTracks)} className={term === shortTermTracks ? s.active : ""}>Short Term</button>
                    <button onClick={() => setTerm(mediumTermTracks)} className={term === mediumTermTracks ? s.active : ""}>Medium Term</button>
                    <button onClick={() => setTerm(longTermTracks)} className={term === longTermTracks ? s.active : ""}>Long Term</button>
                </div>
            </div>
            <div className={s.content}>
                {topTracks.loading ? (
                    <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <ScaleLoader color="#1db954" loading={true} height={60} css="display: block;" />
                    </div>
                ) : (
                    term.map(track => {
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

export default TopTracks;