const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  spotifyId: { type: String, required: true, index: true },
  coverUrl: { type: String },
  aboutText: { type: String, default: "Welcome to my Spotify profile!" },
  profileImg: { type: String },
  display_name: { type: String, required: true, index: true },
  followers: { type: Number },
  profileLink: { type: String },
  friends: [
    {
      id: { type: String },
      spotifyId: { type: String },
      display_name: { type: String },
      profileImg: { type: String },
    },
  ],
  spotifyDetails: {
    playlists: [{ type: Object }],
    currentlyListen: { type: Object },
  },
});

userSchema.index({ display_name: "text", spotifyId: "text" });
mongoose.model("users", userSchema);
