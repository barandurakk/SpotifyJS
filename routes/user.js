const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  app.post("/api/setUserAbout", async (req, res) => {
    const body = req.body.body;
    const token = req.body.token;

    if (body.length > 200) {
      return res.status(400).send({ error: "About can't be longer than 200 character!" });
    }
    if (!token) {
      return res.status(401).send({ error: "Session timeout, please login again!" });
    }

    try {
      const user = await User.findOne({ spotifyId });
      if (!user) {
        return res.status(404).send({ error: "We couldn't find the user, please log in again!" });
      }
      axios
        .get("https://api.spotify.com/v1/me", setHeader(token))
        .then(async (spotifyUser) => {
          if (spotifyUser.data.id !== user.spotifyId) {
            return res.status(403).send({ error: "You can't edit other user's profile!" });
          } else {
            user.update({ aboutText: body });
            return res.status(200).send({ aboutText: body });
          }
        })
        .catch((err) => {
          return res.status(500).send({ error: "Can't connect to spotify servers!" });
        });
    } catch (err) {
      return res.status(500).send({ error: "There is something wrong!" });
    }
  });
};
