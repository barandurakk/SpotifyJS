const axios = require("axios");
const setHeader = require("../util/setAuthHeader.js");
const verifyUser = require("../middlewares/verifyUser");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  //get users current track
  app.get("/api/getCurrentTrack", verifyUser, async (req, res) => {
    axios
      .get("https://api.spotify.com/v1/me/player/currently-playing", setHeader(req.token))
      .then(async (currentTrack) => {
        User.findOneAndUpdate(
          { spotifyId: req.user.spotifyId },
          {
            "spotifyDetails.currentlyListen": currentTrack.data.item,
          }
        )
          .then(() => {
            return res.status(200).send({ currentTrack: currentTrack.data });
          })
          .catch((err) => {
            return res.status(500).send({ error: "Can't connect to local servers!" });
          });
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });

  //Play and stop user's track
  app.get("/api/playTrack", verifyUser, async (req, res) => {
    axios
      .put("https://api.spotify.com/v1/me/player/play", null, setHeader(req.token))
      .then(async () => {
        return res.status(200);
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });

  app.get("/api/stopTrack", verifyUser, async (req, res) => {
    axios
      .put("https://api.spotify.com/v1/me/player/pause", null, setHeader(req.token))
      .then(async () => {
        return res.status(200);
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });

  //get users top track and artists
  app.post("/api/getUsersTop", verifyUser, async (req, res) => {
    const type = req.body.type;

    let config = setHeader(req.token);
    //Adjust time param to short
    config = { ...config, params: { time_range: "short_term" } };
    axios
      .get(`https://api.spotify.com/v1/me/top/${type}`, config)
      .then(async (resShort) => {
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
  app.get("/api/getRecentTracks", verifyUser, async (req, res) => {
    axios
      .get(`https://api.spotify.com/v1/me/player/recently-played`, setHeader(req.token))
      .then(async (response) => {
        return res.status(200).send(response.data);
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });

  //get users owned playlists
  app.get("/api/getUserPlaylists", verifyUser, async (req, res) => {
    axios
      .get(`https://api.spotify.com/v1/me/playlists`, setHeader(req.token))
      .then(async (response) => {
        User.findOneAndUpdate(
          { spotifyId: req.user.spotifyId },
          {
            "spotifyDetails.playlists": response.data.items,
          }
        )
          .then(() => {
            return res.status(200).send(response.data);
          })
          .catch((err) => {
            return res.status(500).send({ error: "Can't connect to local servers!" });
          });
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });
};
