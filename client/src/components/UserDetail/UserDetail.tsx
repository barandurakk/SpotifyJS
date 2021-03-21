import React from "react";
import styles from "./UserDetail.module.scss";
import RefreshButton from "../RefreshButton/RefreshButton";

//global styles 
import "../../scss/_global.scss";

interface userType {
    user:{
        id:string,
        displayName:string,
        imageUrl: string,
        followers: number,
        profileLink: string,
        aboutText: string,
    }  
}

type propType = userType

const UserDetail:React.FC<propType> = ({user}:propType) => {

  return (
    <div className={styles.container}> 
     <RefreshButton/>
        <div className={styles.pictureWrapper}>
            <img 
                src={user.imageUrl} 
                alt={`${user.displayName}'s Profile`}
                className={styles.picture}
            />
        </div>     
        <a href={user.profileLink}> <span className={styles.name}>{user.displayName}</span></a>
        <span className={styles.followers}>Followers: <span>{user.followers}</span></span>
        <div className={styles.aboutWrapper}>
            <h3>ABOUT</h3>
            <span>{user.aboutText.length > 199 ? `${user.aboutText.slice(0,200)}...`: `${user.aboutText}`}</span>
        </div>
    </div>
  )
};

export default UserDetail;
