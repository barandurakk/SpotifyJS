const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  spotifyId: { type: String, required: true },
  coverUrl: { type: String },
  aboutText: { type: String, default: "Welcome to my Spotify profile!" },
  profileImg: { type: String, required: true },
  display_name: { type: String },
  friends: [
    {
      id: { type: String },
      spotifyId: { type: String },
      display_name: { type: String },
      profileImg: { type: String },
    },
  ],
});

mongoose.model("users", userSchema);
