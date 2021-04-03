const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  //send a friend request
  app.post("/api/request/send", async (req, res) => {
    const { spotifyId } = req.body;

    if (!spotifyId) {
      res.status(400).send({ error: "You have to indicate a recipient id!" });
    }

    //find user by recipient Id
    try {
      const recipient = await User.findOne({ spotifyId: spotifyId });
      if (!recipient) {
        res.status(404).send({ error: "There is no user with that id!" });
      }
      console.log(recipient.display_name);
    } catch (err) {}
  });
};
