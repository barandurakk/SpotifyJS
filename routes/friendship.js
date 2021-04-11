const mongoose = require("mongoose");
const User = mongoose.model("users");
const FriendRequest = mongoose.model("friendRequest");
const verifyUser = require("../middlewares/verifyUser");

module.exports = (app) => {
  //send a friend request
  app.post("/api/request/send/:id", verifyUser, async (req, res) => {
    const recipientId = req.params.id;
    console.log("send!");

    if (!recipientId) {
      return res.status(400).send({ error: "You have to indicate a recipient and requester id!" });
    }

    //find user by recipient Id
    try {
      const recipient = await User.findOne({ spotifyId: recipientId });
      if (!recipient) {
        return res.status(404).send({ error: "There is no user with that id!" });
      }

      if (recipientId === req.user.spotifyId)
        return res.status(400).send({ error: "You can't request to yourself!" });

      //check if there is already a request by that infos
      const existingRequest = await FriendRequest.findOne({
        $and: [
          { "requester.spotifyId": req.user.spotifyId },
          { "recipient.spotifyId": recipientId },
        ],
      });
      if (existingRequest) {
        return res.status(400).json({ error: "You already send friend request to this user!" });
      }

      //check if already friends with that user.
      const existingFriend = await User.findOne({
        $and: [{ _id: req.user._id }, { "friends.spotifyId": recipientId }],
      });
      if (existingFriend)
        return res.status(400).send({ error: "You are already friends with that user!" });

      const newRequest = new FriendRequest({
        requester: {
          display_name: req.user.display_name,
          id: req.user._id,
          profileImg: req.user.profileImg,
          spotifyId: req.user.spotifyId,
        },
        recipient: {
          display_name: recipient.display_name,
          id: recipient._id,
          profileImg: recipient.profileImg,
          spotifyId: recipient.spotifyId,
        },
      });

      await newRequest.save();

      return res.status(200).send({ message: "Request sended successfully!" });
    } catch (err) {
      return res.status(500).send({ error: "Something is wrong!" });
    }
  });

  //get friend request that you are recipient
  app.post("/api/request/get", verifyUser, async (req, res) => {
    const friendRequests = await FriendRequest.find({ "recipient.id": req.user.id });

    return res.status(200).send(friendRequests);
  });

  //accept a friend request and add friend
  app.get("/api/request/accept/:id", verifyUser, async (req, res) => {
    const requestId = req.params.id;

    if (!requestId) return res.status(400).send({ error: "You have to specify a request id!" });

    try {
      const request = await FriendRequest.findOne({ _id: requestId, "recipient.id": req.user._id });

      if (!request)
        return res
          .status(404)
          .send({ error: "We couldn't find any request that match this parameters!" });

      //update recipients friends
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            friends: {
              id: request.requester.id,
              spotifyId: request.requester.spotifyId,
              display_name: request.requester.display_name,
              profileImg: request.requester.profileImg,
            },
          },
        }
      );
      //update requesters friends
      await User.findOneAndUpdate(
        { _id: request.requester.id },
        {
          $push: {
            friends: {
              id: req.user._id,
              spotifyId: req.user.spotifyId,
              display_name: req.user.display_name,
              profileImg: req.user.profileImg,
            },
          },
        }
      );
    } catch (err) {
      return res.status(500).send({ error: "Something wrong with local database!" });
    }

    //delete current request
    try {
      await FriendRequest.remove({ _id: requestId });
      return res.status(200).send({ message: "Friend added succesfully!" });
    } catch (err) {
      return res.status(500).send({ error: "Something happened while accepting request!" });
    }
  });

  //decline a friend request
  app.get("/api/request/decline/:id", verifyUser, async (req, res) => {
    const requestId = req.params.id;

    if (!requestId) return res.status(400).send({ error: "You have to specify a request id!" });

    try {
      const request = await FriendRequest.findOneAndDelete({
        _id: requestId,
        "recipient.id": req.user._id,
      });
      if (!request) {
        return res.status(404).send({ error: "We couldn't find any request with that id!" });
      }

      return res.status(200).send({ message: "Request Declined Succesfully!" });
    } catch (err) {
      return res.status(500).send({ error: "Something wrong with local database!" });
    }
  });

  //delete a friend
  app.get("/api/request/delete/:id", verifyUser, async (req, res) => {
    const friendId = req.params.id;

    if (!friendId) return res.status(400).send({ error: "You have to specify a user id!" });

    User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $pull: { friends: { id: friendId } },
      }
    )
      .then(() => {
        User.findByIdAndUpdate(
          { _id: friendId },
          {
            $pull: { friends: { id: req.user._id } },
          }
        )
          .then(() => {
            res.status(200).send({ message: "Friend deleted succesfully!" });
          })
          .catch((err) => {
            return res.status(500).send({ error: "Something wrong with local database!" });
          });
      })
      .catch((err) => {
        return res.status(500).send({ error: "Something wrong with local database!" });
      });
  });

  app.get("/api/getFriends", verifyUser, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user._id });
      const friends = user.friends;
      res.status(200).send(friends);
    } catch (err) {
      return res.status(500).send({ error: "Something wrong with local database!" });
    }
  });
};
