import React from "react";


const ProgressBar: React.FC<any> = ({ progress, duration, backgroundColor, progressColor, width }: any) => {


    return (
        <div style={{ position: "relative", width: "100%", height: width, backgroundColor: backgroundColor, borderRadius: 25 }}>
            <div style={{
                position: "absolute",
                width: `${((100 * progress) / duration).toFixed(2)}%`,
                height: width,
                backgroundColor: progressColor,
                textAlign: "right",
                fontWeight: 800,
                lineHeight: 1
            }}>
                <span style={{
                    fontSize: 9.5,
                    color: "white",
                }}>%{Math.floor((100 * progress) / duration)}</span>
            </div>
        </div>
    )
}

export default ProgressBar;