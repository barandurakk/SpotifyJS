import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

//global styles 
import "../scss/_global.scss";


const Loading:React.FC = () => {

  return (
    <div className="loading-container">
        <ScaleLoader color="#1db954" loading={true} height={60} css="display: block;" />
    </div>
  )
};

export default Loading;
