import React, { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Link } from "react-router-dom";
import { searchUser } from "../../redux/asyncActions/userActions";
import { unsetResult } from "../../redux/slices/uiSlice";
import ScaleLoader from "react-spinners/ScaleLoader";
import csx from "classnames"

import s from "./Search.module.scss";

const Search: React.FC = () => {
    const dispatch = useAppDispatch();
    const search = useAppSelector(state => state.ui.search);
    const [keyword, setKeyword] = useState("");
    const [showSub, setShowSub] = useState(false);

    const handleOnChange = (e: any) => {
        setKeyword(e.target.value);
    }

    useEffect(() => {

        //search
        if (keyword.length > 0) {
            dispatch(searchUser(keyword));
            setShowSub(true);
        } else {
            dispatch(unsetResult());
            setShowSub(false);
        }

    }, [keyword])

    return (
        <>
            <div className={s.container}>
                <span
                    className={s.inputWrapper}>
                    <input
                        type="text"
                        placeholder="Search user by name..."
                        value={keyword}
                        onChange={(e) => handleOnChange(e)}
                    />
                    <i className="fa fa-search"></i>
                </span>
                <div className={csx(s.subResult, showSub ? s.show : "")}>
                    {search.loading ? (
                        <div style={{ display: "flex", height: "100%", justifyContent: "center", alignItems: "center" }}>
                            <ScaleLoader color="#1db954" loading={true} height={15} css="display: block;" />
                        </div>
                    ) : (
                        search.result.map((user: any) => {
                            //@ts-ignore
                            return (
                                <>
                                    <div className={s.userItem} key={user.id}>
                                        <Link to={`/user/${user.spotifyId}`}><div className={s.image} style={{ backgroundImage: `url(${user.profileImg})` }}></div></Link>
                                        <div className={s.itemContent}>
                                            <div>
                                                <div className={s.name}> <Link to={`/user/${user.spotifyId}`}>{user.display_name}</Link></div>
                                                <span className={s.about}>{user.aboutText.length > 30 ? user.aboutText.slice(0, 30) : user.aboutText}</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    )
                    }
                </div>
            </div>
        </>
    )
}

export default Search;