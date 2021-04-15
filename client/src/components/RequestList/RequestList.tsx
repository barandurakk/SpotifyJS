import React from "react";
import csx from "classnames";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { acceptRequest, getFriendRequests, rejectRequest } from "../../redux/asyncActions/userActions";

import s from "./RequestList.module.scss";

const RequestList: React.FC<any> = ({ requests }: any) => {
    const dispatch = useAppDispatch();

    const handleAccept = (id: string) => {
        dispatch(acceptRequest(id));
        dispatch(getFriendRequests())
    }

    const handleReject = (id: string) => {
        dispatch(rejectRequest(id));
        dispatch(getFriendRequests())
    }

    return (
        <div className={s.container}>
            {requests?.map((request: any) => {
                return (
                    <div className={s.item}>
                        <div className={s.content}>
                            <div className={s.pictureWrapper} style={{ backgroundImage: `url(${request.requester.pictureUrl})` }}></div>
                            <div className={s.text}>
                                <span className={s.name}>{request.requester.display_name}</span>
                                <span className={s.about}>{request.requester.spotifyId}</span>
                            </div>
                        </div>
                        <div className={s.actions}>
                            <i className={csx("fas fa-check", s.check)}
                                onClick={() => handleAccept(request._id)}
                            ></i>
                            <i className={csx("fas fa-times", s.cross)}
                                onClick={() => handleReject(request._id)}
                            ></i>
                        </div>
                    </div>)
            })}
        </div >
    )
}

export default RequestList;