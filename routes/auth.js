const axios = require("axios");
const setHeader = require("../util/setAuthHeader.js");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/api/getUserDetails", (req, res) => {
    const token = req.body.token;
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me", setHeader(token))
        .then(async (details) => {
          const userImage = details.data.images[0].url;
          let response;
          try {
            const user = await User.findOne({ spotifyId: details.data.id });
            //If there is no user create one and prepare a response.
            if (!user) {
              const newUser = new User({
                spotifyId: details.data.id,
                coverUrl: userImage,
                aboutText: "Welcome to my Spotify profile!",
              });
              newUser.save();
              response = {
                ...newUser._doc,
                display_name: details.data.display_name,
                external_urls: details.data.external_urls,
                followers: details.data.followers,
                imageUrl: userImage,
              };
              return res.status(200).send(response);
              //if there is user, dont update user because there is no overriding information
            } else {
              response = {
                ...user._doc,
                display_name: details.data.display_name,
                external_urls: details.data.external_urls,
                followers: details.data.followers,
                imageUrl: userImage,
              };
              return res.status(200).send(response);
            }
          } catch (err) {
            console.error(err);
            return res.status(500).send({ error: "Something wrong with local database!" });
          }
        })
        .catch((err) => {
          if (err.response.status === 401) return res.status(401).send({ error: "Invalid Token" });
          return res.status(500).send({ error: "Something is wrong!" });
        });
    } else {
      return res.status(403).send({ error: "Token cannot found!" });
    }
  });

  app.post("/api/getUsersTopTracks", (req, res) => {
    const token = req.body.token;
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/top/tracks", setHeader(token))
        .then(async (details) => {
          console.log(details.data);
          return res.status(200).send(details.data);
        })
        .catch((err) => {
          if (err.response.status === 401) return res.status(401).send({ error: "Invalid Token" });
          return res.status(500).send({ error: "Something is wrong!" });
        });
    } else {
      return res.status(403).send({ error: "Token cannot found!" });
    }
  });
};
