import React from "react";
import styles from "./RefreshButton.module.scss";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { login } from "../../redux/asyncActions/authActions";
import { getCurrentTrack } from "../../redux/asyncActions/spotifyActions";
import { getLocalToken } from "../../util/getLocalToken";

//global styles 
import "../../scss/_global.scss";

interface propType {
  location: string
}

const RefreshButton: React.FC<propType> = ({ location }: propType) => {
  const dispatch = useAppDispatch();

  const refreshProfile = () => {
    const token = getLocalToken();
    dispatch(login(token))
  }

  const refreshPlayer = () => {
    dispatch(getCurrentTrack());
  }

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => { location === "profile" ? refreshProfile() : location === "player" ? refreshPlayer() : console.log("none") }}
      ><i className="fas fa-sync-alt"></i></button>
    </div>
  )
};

export default RefreshButton;
