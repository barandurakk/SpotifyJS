const mongoose = require("mongoose");
const { Schema } = mongoose;

const FriendRequestSchema = new Schema({
  requester: {
    display_name: { type: String },
    id: { type: String },
    profileImg: { type: String },
    spotifyId: { type: String },
  },
  recipient: {
    display_name: { type: String },
    id: { type: String },
    profileImg: { type: String },
    spotifyId: { type: String },
  },
  dateCreated: { type: Date, required: true, default: new Date().toISOString() },
});

mongoose.model("friendRequest", FriendRequestSchema);
