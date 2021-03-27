import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getTopDetails } from "../../redux/asyncActions/spotifyActions";

import s from "./TopArtists.module.scss";

import ProgressBar from "../ProgressBar/ProgressBar";


const TopArtist: React.FC = () => {
    const dispatch = useAppDispatch();
    const topArtists = useAppSelector(state => state.spotify.topArtists);
    const artists = topArtists.artistList;

    useEffect(() => {

        dispatch(getTopDetails("artists"));

    }, [])
    return (
        <div className={s.container}>
            <div className={s.headerWrapper}>
                <h3>Top Artists</h3>
            </div>
            <div className={s.content}>
                {topArtists.loading ? (
                    <div>Loading...</div>
                ) : (
                    artists.map(artist => {
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