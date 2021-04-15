import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { getFriendRequests } from "../../redux/asyncActions/userActions";

//Components
import RequestList from "../RequestList/RequestList";

import csx from "classnames";

import s from "./Notification.module.scss";

const Notification: React.FC = () => {
    const dispatch = useAppDispatch();
    const { list, loading } = useAppSelector(state => state.user.requests);
    const [open, setOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(1);

    useEffect(() => {

        dispatch(getFriendRequests())

    }, [])


    return (
        <>
            <div className={s.bellContainer}>
                <button className={s.bell}
                    onClick={() => setOpen(!open)}
                >
                    <i className="far fa-bell"></i></button>
                {list.length > 0 ? (
                    <div className={s.badge}></div>
                ) : (
                    null
                )}
            </div>
            <div className={csx(s.backgroundBlur, open ? s.show : "")}
                onClick={() => setOpen(false)}
            ></div>
            <div className={csx(s.drawer, open ? s.open : "")}>
                <div className={s.wrapper}>
                    <div className={s.tabs}>
                        <div onClick={() => setTabIndex(1)} className={tabIndex === 1 ? s.active : ""}>Requests</div>
                        <div onClick={() => setTabIndex(2)} className={tabIndex === 2 ? s.active : ""}>Reactions</div>
                    </div>
                    <div className={s.content}>
                        {tabIndex === 1 ? (
                            <RequestList requests={list} />
                        ) : tabIndex === 2 ? (
                            <div>To soon...</div>
                        ) : null}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification;