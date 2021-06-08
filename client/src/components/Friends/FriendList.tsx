import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getFriends } from "../../redux/asyncActions/userActions";
import csx from "classnames";
import s from "./FriendList.module.scss";

const FriendList: React.FC = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const { list, loading } = useAppSelector(state => state.user.friends);

    useEffect(() => {

        dispatch(getFriends())

    }, [])

    return (
        <>
            <div className={s.iconContainer}>
                <button className={s.icon}
                    onClick={() => setOpen(!open)}
                >
                    <i className="fas fa-users"></i></button>
            </div>
            <div className={csx(s.backgroundBlur, open ? s.show : "")}
                onClick={() => setOpen(false)}
            ></div>
            <div className={csx(s.drawer, open ? s.open : "")}>
                <div className={s.wrapper}>
                    <div className={s.titleWrapper}>
                        <span>Your Friends</span>
                    </div>
                    <div className={s.content}>
                        {
                            list.map((friend: any) => {
                                return (
                                    <Link to={`/user/${friend.spotifyId}`}>
                                        <div className={s.item} key={friend.id}>
                                            <div className={s.itemContent}>
                                                <div className={s.pictureWrapper} style={{ backgroundImage: `url(${friend.pictureUrl})` }}></div>
                                                <div className={s.text}>
                                                    <span className={s.name}>{friend.display_name}</span>
                                                    <span className={s.about}>{friend.spotifyId}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )

                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FriendList;