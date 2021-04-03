const mongoose = require("mongoose");
const User = mongoose.model("users");
const FriendRequest = mongoose.model("friendRequest");

module.exports = (app) => {
  //send a friend request
  app.post("/api/request/send", async (req, res) => {
    const { requesterId, recipientId } = req.body;

    if (!requesterId || !recipientId) {
      res.status(400).send({ error: "You have to indicate a recipient and requester id!" });
    }

    //find user by recipient Id
    try {
      const requester = await User.findOne({ spotifyId: requesterId });
      const recipient = await User.findOne({ spotifyId: recipientId });
      if (!recipient || !requester) {
        res.status(404).send({ error: "There is no user with that id!" });
      }

      const newRequest = new FriendRequest({
        requester: {
          display_name: requester.display_name,
          id: requester._id,
          profileImg: requester.profileImg,
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
  app.post("/api/request/get", async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).send({ error: "You have to indicate a user id!" });
    }

    const user = await User.findOne({ spotifyId: userId });
    if (!user) {
      res.status(404).send({ error: "There is no user by that id!" });
    }

    const friendRequests = await FriendRequest.find({ "recipient.id": user.id });

    res.status(200).send(friendRequests);
  });
};
