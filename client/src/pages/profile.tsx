import React, { useEffect } from "react";
import { useAppSelector,useAppDispatch } from "../hooks/reduxHooks";
import {RootState} from "../reducers/store";
import {Link} from "react-router-dom"
import {fetchCurrentUser} from "../actions/index";

const Profile:React.FC = (props:any) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state:RootState) => state.data.user);
  const authError = useAppSelector((state:RootState) => state.data.authError);
  const token:any = localStorage.getItem("spotifyAuthToken");
  

  useEffect(() => {
    if(authError){
      props.history.push("/");
    }
  }, [authError])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(token && !user.id){

      dispatch(fetchCurrentUser(token));

    }else if(!token){
      props.history.push("/");
    }
    
    console.log("storage token", token);
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div>
    
    name: {user.displayName} <br/>
    {user.images.slice(0,1).map(image => {
      return (
        <img src={image.url} key={user.id}/>
      )
    })}
    <Link to="/">Back to Landing</Link>
  </div>;
};

export default Profile;
