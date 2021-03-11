import React from "react";
import keys from "../config/keys";
import {connect} from "react-redux";
import { SpotifyAuth, Scopes } from 'react-spotify-auth';

//actions
import {signIn} from "../actions/index";

import "../scss/landing.scss";

class Landing extends React.Component {

  handleAuth = (token) => {
    if(token){
      this.props.signIn(token);
      this.props.history.push("/panel");
    }
  }

  render() {
    return <div className="landing-container">
            <div className="leftSide-wrapper">

            </div>
            <div className="rightSide-wrapper">
              <div className="welcome-header-wrapper">
                <h1>Spotify<span>JS</span></h1>
                <span>You can view your account analysis</span>
              </div>
            <SpotifyAuth
                redirectUri='http://localhost:3000/'
                clientID={keys.spotifyClientID}
                scopes={[Scopes.userReadPrivate, 'user-read-email', "user-top-read", "user-read-recently-played"
                ,"user-read-currently-playing","user-follow-read"
              ]}
                localStorage={true}
                showDialog={true}
                noCookie={true}
                onAccessToken={(token) => this.handleAuth(token)}
                btnClassName="spotify-button"
                logoClassName="spotify-logo"
            />
            </div>
    </div>;
  }
}

export default connect(null, {signIn})(Landing);
