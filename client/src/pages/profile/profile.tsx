import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import csx from "classnames"

import styles from "./profile.module.scss";
import "../../scss/_global.scss";

//components
import UserDetail from "../../components/UserDetail/UserDetail";

const Profile:React.FC = (props:any) => {
  const {user, authError, isAuthenticated, loading} = useAppSelector(state => state.auth);

  useEffect(() => { 
    if(authError || !isAuthenticated){
      props.history.push("/");
    }
  }, [authError, isAuthenticated])// eslint-disable-line react-hooks/exhaustive-deps

  return <>
  <div style={{
         backgroundImage: `url(${user.imageUrl})`
      }} 
      className={styles.coverContainer}>
  </div>
    <div className={csx(styles.content, "container")}>
      <UserDetail user={user} loading={loading} />
    </div>
  </>;
};

export default Profile;
