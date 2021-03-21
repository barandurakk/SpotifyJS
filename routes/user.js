const mongoose = require("mongoose");
const User = mongoose.model("users");
const axios = require("axios");
const setHeader = require("../util/setAuthHeader.js");

module.exports = (app) => {
  app.post("/api/setUserAbout", async (req, res) => {
    const body = req.body.body;
    const token = req.headers.authorization;

    console.log("inside route");

    if (body.length > 200) {
      return res.status(400).send({ error: "About can't be longer than 200 character!" });
    }
    if (!token) {
      return res.status(401).send({ error: "Session timeout, please login again!" });
    }

    axios
      .get("https://api.spotify.com/v1/me", setHeader(token))
      .then(async (spotifyUser) => {
        try {
          const user = await User.findOneAndUpdate(
            { spotifyId: spotifyUser.data.id },
            {
              aboutText: body,
            }
          );
          if (!user) {
            return res
              .status(404)
              .send({ error: "We couldn't find the user, please log in again!" });
          } else {
            return res.status(200).send({ aboutText: body });
          }
        } catch (err) {
          return res
            .status(500)
            .send({ error: "There is something wrong while connecting local database!" });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ error: "Can't connect to spotify servers!" });
      });
  });
};
