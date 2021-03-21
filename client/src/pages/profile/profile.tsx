import React, { useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import csx from "classnames"
import Loading from "../../util/Loading";

import styles from "./profile.module.scss";
import "../../scss/_global.scss";

//components
import UserDetail from "../../components/UserDetail/UserDetail";

const Profile:React.FC = (props:any) => {
  const {authError, isAuthenticated, loading} = useAppSelector(state => state.auth);
  const {user} = useAppSelector(state => state.user);

  useEffect(() => { 
    if(authError || !isAuthenticated){
      props.history.push("/");
    }
  }, [authError, isAuthenticated])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
    {loading ? (
      <Loading/>
    ):
    (
      <>
      <div style={{
        backgroundImage: `url(${user.coverUrl})`
      }} 
      className={styles.coverContainer}>
      </div>
      <div className={styles.body}>
        <div className={csx(styles.content, "container")}>
        <UserDetail user={user} />
        </div>
      </div>
   </>
    )}
    </>
  )
  
  ;
};

export default Profile;
