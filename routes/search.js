const verifyUser = require("../middlewares/verifyUser");
const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = (app) => {
  //search user

  app.get("/api/search/user/:key", verifyUser, async (req, res) => {
    const keyword = req.params.key;

    //decode keyword
    const decodedKey = decodeURI(keyword);

    User.find(
      {
        $text: { $search: decodedKey },
      },
      { friends: 0 }
    )
      .then((result) => {
        if (result.length < 1) {
          return res.send("There is no match!");
        } else {
          return res.send(result);
        }
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  });
};
