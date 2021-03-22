const axios = require("axios");
const setHeader = require("../util/setAuthHeader.js");

module.exports = (app) => {
  app.get("/api/getCurrentTrack", async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ error: "Session timeout, please login again!" });
    }
    axios
      .get("https://api.spotify.com/v1/me/player/currently-playing", setHeader(token))
      .then(async (currentTrack) => {
        console.log(currentTrack.data);
        return res.status(200).send({ currentTrack: currentTrack.data });
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });
};
