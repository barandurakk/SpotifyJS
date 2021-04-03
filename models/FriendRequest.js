const mongoose = require("mongoose");
const { Schema } = mongoose;

const FriendRequestSchema = new Schema({
  requester: {
    display_name: { type: String },
    id: { type: mongoose.Schema.ObjectId },
    profileImg: { type: String },
  },
  recipient: {
    display_name: { type: String },
    id: { type: mongoose.Schema.ObjectId },
    profileImg: { type: String },
  },
});

mongoose.model("friendRequest", FriendRequestSchema);
