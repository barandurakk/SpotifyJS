const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  spotifyId: { type: String, required: true },
  coverUrl: { type: String },
  aboutText: { type: String, default: "Welcome to my Spotify profile!" },
});

mongoose.model("users", userSchema);
