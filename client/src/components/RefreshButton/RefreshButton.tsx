import React from "react";
import styles from "./RefreshButton.module.scss";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {login} from "../../redux/asyncActions/index";
import {getLocalToken} from "../../util/getLocalToken";

//global styles 
import "../../scss/_global.scss";

const RefreshButton:React.FC = () => {
    const dispatch = useAppDispatch();

    const handleRefresh = () => {
        console.log("refresh");
        const token = getLocalToken();
        dispatch(login(token))
    }

  return (
    <div className={styles.wrapper}> 
        <button
        onClick={() => handleRefresh()}
        ><i className="fas fa-sync-alt"></i></button>
    </div>
  )
};

export default RefreshButton;
