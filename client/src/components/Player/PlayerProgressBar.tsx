import React from "react";


const PlayerProgressBar: React.FC<any> = ({ progress, duration }: any) => {


    return (
        <div style={{ position: "relative", width: "100%", height: 8, backgroundColor: "#121212", borderRadius: 25 }}>
            <div style={{ position: "absolute", width: `${((100 * progress) / duration).toFixed(2)}%`, height: 8, backgroundColor: "#1db954" }}>

            </div>
        </div>
    )
}

export default PlayerProgressBar;