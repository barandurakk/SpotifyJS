import React, { useState } from "react";
import styles from "./UserDetail.module.scss";
import RefreshButton from "../RefreshButton/RefreshButton";
import { useDispatch } from "react-redux";
import { setAboutText } from "../../redux/asyncActions/userActions";

//global styles 
import "../../scss/_global.scss";

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

type propType = userType

const UserDetail: React.FC<propType> = ({ user }: propType) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [aboutInput, setAboutInput] = useState(user.aboutText.length > 199 ? `${user.aboutText.slice(0, 200)}...` : `${user.aboutText}`);
    const [formError, setFormError] = useState("");

    const handleSubmit = () => {
        if (aboutInput.length > 200) {
            setFormError("About cant be longer than 200 characters!");
        } else {
            dispatch(setAboutText(aboutInput));
            setIsEditing(false);
        }
    }
    const handleChange = (e: any) => {
        setAboutInput(e.target.value);
    }

    return (
        <div className={styles.container}>
            <RefreshButton />
            <div className={styles.pictureWrapper} style={{ backgroundImage: `url(${user.imageUrl})` }}>
            </div>
            <a href={user.profileLink}> <span className={styles.name}>{user.displayName}</span></a>
            <span className={styles.followers}>Followers: <span>{user.followers}</span></span>
            <div className={styles.aboutWrapper}>
                <h3>ABOUT</h3>
                <div className={styles.aboutContent}>
                    {isEditing ?
                        (
                            <>
                                <textarea
                                    rows={8}
                                    name="aboutText"
                                    value={aboutInput}
                                    onChange={(e) => handleChange(e)}
                                />
                                {formError &&
                                    <span
                                        className={styles.errorMessage}
                                    >{formError}</span>}
                                <div className={styles.actionWrapper}>
                                    <button
                                        className={styles.submitButton}
                                        onClick={() => handleSubmit()}
                                    ><i className="fas fa-check"></i></button>
                                    <button
                                        className={styles.cancelButton}
                                        onClick={() => setIsEditing(false)}
                                    ><i className="fas fa-times"></i></button>
                                </div>
                            </>
                        )
                        :
                        (
                            <>
                                <button
                                    className={styles.editButton}
                                    onClick={() => setIsEditing(true)}
                                >
                                    <i className="fas fa-pen"></i>
                                </button>
                                <span>{user.aboutText.length > 199 ? `${user.aboutText.slice(0, 200)}...` : `${user.aboutText}`}</span>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default UserDetail;
