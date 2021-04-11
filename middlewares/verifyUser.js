const mongoose = require("mongoose");
const User = mongoose.model("users");
const axios = require("axios");
const setHeader = require("../util/setAuthHeader.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send({ error: "Session timeout, please login again!" });

  axios
    .get("https://api.spotify.com/v1/me", setHeader(token))
    .then(async (spotifyUser) => {
      try {
        const user = await User.findOne({ spotifyId: spotifyUser.data.id });
        if (!user) res.status(401).send({ error: "You have to sign up SpotifyJs!" });

        req.user = user;
        req.token = token;
        next();
      } catch (err) {
        return res
          .status(500)
          .send({ error: "There is something wrong while connecting local database!" });
      }
    })
    .catch((err) => {
      if (err.response?.status === 401) return res.status(401).send({ error: "Invalid Token" });
      return res.status(500).send({ error: "Can't connect to spotify servers!" });
    });
};
