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

    let config = setHeader(token);
    //Adjust time param to short
    config = { ...config, params: { time_range: "short_term" } };
    console.log("Config short:", config);
    axios
      .get(`https://api.spotify.com/v1/me/top/${type}`, config)
      .then(async (resShort) => {
        console.log("ShorTermRes: ", resShort.data);
        //Adjust time param to medium
        config = { ...config, params: { time_range: "medium_term" } };
        axios
          .get(`https://api.spotify.com/v1/me/top/${type}`, config)
          .then(async (resMedium) => {
            //Adjust time param to long
            config = { ...config, params: { time_range: "long_term" } };
            axios
              .get(`https://api.spotify.com/v1/me/top/${type}`, config)
              .then(async (resLong) => {
                //Send succesfull response
                return res.status(200).send({
                  top: { short: resShort.data, medium: resMedium.data, long: resLong.data },
                });
              })
              .catch((err) => {
                return res.status(500).send({ error: "Can't connect to spotify servers!" });
              });
          })
          .catch((err) => {
            return res.status(500).send({ error: "Can't connect to spotify servers!" });
          });
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });

  //get users top track and artists
  app.get("/api/getRecentTracks", async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ error: "Session timeout, please login again!" });
    }

    axios
      .get(`https://api.spotify.com/v1/me/player/recently-played`, setHeader(token))
      .then(async (response) => {
        return res.status(200).send(response.data);
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });

  //get users owned playlists
  app.get("/api/getUserPlaylists", async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ error: "Session timeout, please login again!" });
    }

    axios
      .get(`https://api.spotify.com/v1/me/playlists`, setHeader(token))
      .then(async (response) => {
        return res.status(200).send(response.data);
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });
};
