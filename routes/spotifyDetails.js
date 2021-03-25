const axios = require("axios");
const setHeader = require("../util/setAuthHeader.js");

module.exports = (app) => {
  //get users current track
  app.get("/api/getCurrentTrack", async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ error: "Session timeout, please login again!" });
    }
    axios
      .get("https://api.spotify.com/v1/me/player/currently-playing", setHeader(token))
      .then(async (currentTrack) => {
        return res.status(200).send({ currentTrack: currentTrack.data });
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });

  //Play and stop user's track
  app.get("/api/playTrack", async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ error: "Session timeout, please login again!" });
    }

    axios
      .put("https://api.spotify.com/v1/me/player/play", null, setHeader(token))
      .then(async () => {
        return res.status(200);
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });

  app.get("/api/stopTrack", async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ error: "Session timeout, please login again!" });
    }

    axios
      .put("https://api.spotify.com/v1/me/player/pause", null, setHeader(token))
      .then(async () => {
        return res.status(200);
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });

  //get users top track and artists
  app.post("/api/getUsersTop", async (req, res) => {
    const token = req.headers.authorization;
    const type = req.body.type;

    if (!token) {
      return res.status(401).send({ error: "Session timeout, please login again!" });
    }

    axios
      .get(`https://api.spotify.com/v1/me/top/${type}`, setHeader(token))
      .then(async (response) => {
        return res.status(200).send({ top: response.data });
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });
};
