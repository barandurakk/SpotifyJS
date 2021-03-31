import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getTopDetails } from "../../redux/asyncActions/spotifyActions";
import ScaleLoader from "react-spinners/ScaleLoader";

import s from "./TopArtists.module.scss";

import ProgressBar from "../ProgressBar/ProgressBar";


const TopArtist: React.FC = () => {
    const dispatch = useAppDispatch();
    const topArtists = useAppSelector(state => state.spotify.topArtists);
    const shortTermArtists = topArtists.artistList.short_term;
    const mediumTermArtists = topArtists.artistList.medium_term;
    const longTermArtists = topArtists.artistList.long_term;

    const [term, setTerm] = useState(mediumTermArtists);

    useEffect(() => {

        dispatch(getTopDetails("artists"));

    }, [])
    useEffect(() => {

        setTerm(mediumTermArtists);

    }, [topArtists])
    return (
        <div className={s.container}>
            <div className={s.headerWrapper}>
                <h3>Top Artists</h3>
                <div className={s.actionButtons}>
                    <button onClick={() => setTerm(shortTermArtists)} className={term === shortTermArtists ? s.active : ""}>Short Term</button>
                    <button onClick={() => setTerm(mediumTermArtists)} className={term === mediumTermArtists ? s.active : ""}>Medium Term</button>
                    <button onClick={() => setTerm(longTermArtists)} className={term === longTermArtists ? s.active : ""}>Long Term</button>
                </div>
            </div>
            <div className={s.content}>
                {topArtists.loading ? (
                    <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <ScaleLoader color="#1db954" loading={true} height={60} css="display: block;" />
                    </div>
                ) : (
                    term.map(artist => {
                        return (
                            <div className={s.listItem} key={artist.id}>
                                <a target={"_blank"} href={artist.url}><div className={s.image} style={{ backgroundImage: `url(${artist.imageUrl})` }}></div></a>
                                <div className={s.itemContent}>
                                    <div>
                                        <div className={s.name}> <a target={"_blank"} href={artist.url}>{artist.name}</a></div>
                                        <div className={s.followers}>Followers: {artist.followers}</div>
                                    </div>
                                    <div>
                                        <span className={s.popularityTag}>Popularity</span>
                                        <ProgressBar progress={artist.popularity}
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

export default TopArtist;