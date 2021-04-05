const mongoose = require("mongoose");
const User = mongoose.model("users");
const FriendRequest = mongoose.model("friendRequest");
const verifyUser = require("../middlewares/verifyUser");

module.exports = (app) => {
  //send a friend request
  app.post("/api/request/send", verifyUser, async (req, res) => {
    const { recipientId } = req.body;

    if (!recipientId) {
      res.status(400).send({ error: "You have to indicate a recipient and requester id!" });
    }

    //find user by recipient Id
    try {
      const recipient = await User.findOne({ spotifyId: recipientId });
      if (!recipient) {
        res.status(404).send({ error: "There is no user with that id!" });
      }

      if (recipientId === req.user.spotifyId)
        res.status(400).send({ error: "You can't request to yourself!" });

      const newRequest = new FriendRequest({
        requester: {
          display_name: req.user.display_name,
          id: req.user._id,
          profileImg: req.user.profileImg,
        },
        recipient: {
          display_name: recipient.display_name,
          id: recipient._id,
          profileImg: recipient.profileImg,
        },
      });

      await newRequest.save();

      res.send({ message: "Request sended successfully!" });
    } catch (err) {
      return res.status(500).send({ error: "Something is wrong!" });
    }
  });

  //get friend request that you are recipient
  app.post("/api/request/get", verifyUser, async (req, res) => {
    const friendRequests = await FriendRequest.find({ "recipient.id": req.user.id });

    res.status(200).send(friendRequests);
  });
};
