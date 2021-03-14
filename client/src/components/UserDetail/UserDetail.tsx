import React from "react";
import styles from "./UserDetail.module.scss";

//global styles 
import "../../scss/_global.scss";

interface userType {
    user:{
        id:string,
        displayName:string,
        imageUrl: string,
        followers: number,
        profileLink: string
    }  
}
interface loadingType {
    loading: boolean
}

type propType = userType & loadingType

const UserDetail:React.FC<propType> = ({user,loading}:propType) => {

  return <div className={styles.container}> 
  {loading ? (
      <span>Loading</span>
  ) : (
    <div >
    {user.displayName}
    </div>     
  )}  
  </div>;
};

export default UserDetail;
