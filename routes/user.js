const mongoose = require("mongoose");
const User = mongoose.model("users");
const axios = require("axios");
const setHeader = require("../util/setAuthHeader.js");
const verifyUser = require("../middlewares/verifyUser");

module.exports = (app) => {
  app.post("/api/setUserAbout", verifyUser, async (req, res) => {
    const body = req.body.body;

    if (body.length > 200) {
      return res.status(400).send({ error: "About can't be longer than 200 character!" });
    }

    try {
      const user = await User.findOneAndUpdate(
        { spotifyId: req.user.spotifyId },
        {
          aboutText: body,
        }
      );
      if (!user) {
        return res.status(404).send({ error: "We couldn't find the user, please log in again!" });
      } else {
        return res.status(200).send({ aboutText: body });
      }
    } catch (err) {
      return res
        .status(500)
        .send({ error: "There is something wrong while connecting local database!" });
    }
  });

  //get other users profile details
  app.post("/api/getAUserProfile", verifyUser, async (req, res) => {
    const userId = req.body.userId;

    if (!userId) return res.status(400).send({ error: "There is no user id! with response body!" });

    axios
      .get(`https://api.spotify.com/v1/users/${userId}`, setHeader(req.token))
      .then(async (userDetails) => {
        try {
          const user = await User.findOne({ spotifyId: userDetails.data.id });

          if (!user) {
            return res.status(404).send({ error: "There is no user by that Id!" });
          } else {
            return res.status(200).send(user);
          }
        } catch (err) {
          return res
            .status(500)
            .send({ error: "There is something wrong while connecting local database!" });
        }
      })
      .catch((err) => {
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });
};
