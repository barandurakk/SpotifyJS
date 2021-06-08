import React from "react";
import s from "./FriendDetail.module.scss";

interface userType {
    user: {
        id: string,
        displayName: string,
        imageUrl: string,
        followers: number,
        profileLink: string,
        aboutText: string,
    }
}

const FriendDetail: React.FC<userType> = ({ user }: userType) => {
    return (
        <div className={s.container}>
            <div className={s.pictureWrapper} style={{ backgroundImage: `url(${user.imageUrl})` }}>
            </div>
            <a href={user.profileLink} target={"_blank"}> <span className={s.name}>{user.displayName}</span></a>
            <span className={s.followers}>Followers: <span>{user.followers}</span></span>
            {/* <span className={s.followers}>Average Popularity: <span>% {totalPopularity}</span></span> */}

            <div className={s.aboutWrapper}>
                <h3>ABOUT</h3>
                <div className={s.aboutContent}>
                    <span>{user.aboutText.length > 199 ? `${user.aboutText.slice(0, 200)}...` : `${user.aboutText}`}</span>

                </div>
            </div>

        </div>
    )

}

export default FriendDetail