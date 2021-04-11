const verifyUser = require("../middlewares/verifyUser");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  //get other users profile
  app.get("/api/user/:id", verifyUser, async (req, res) => {
    const userId = req.params.id;

    User.find({ spotifyId: userId })
      .then((result) => {
        if (!result) {
          res.status(404).send("We cannot find the user you want!");
        }
        res.status(200).send(result);
      })
      .catch((err) => {
        return res.status(500).send({ error: "Something is wrong!" });
      });
  });
};
