import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getTopDetails } from "../../redux/asyncActions/spotifyActions";


const TopTracks: React.FC = () => {
    const dispatch = useAppDispatch();
    const topTracks = useAppSelector(state => state.spotify.topTracks);

    useEffect(() => {

        dispatch(getTopDetails("tracks"));

    }, [])
    return (
        <div>
            {topTracks.loading ? (
                <div>Loading...</div>
            ) : (
                <div>{topTracks.trackList.map((track: any) => (track.name))}</div>
            )}

        </div>
    )

}

export default TopTracks;