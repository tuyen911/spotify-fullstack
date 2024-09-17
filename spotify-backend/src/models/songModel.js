import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  name: { type: String, require: true },
  desc: { type: String, require: true },
  album: { type: String, require: true },
  imageUrl: { type: String, require: true },
  duration: { type: Number, required: true }, 
  audioUrl: { type: String, required: true },
  duration: { type: String, require: true },
});

const songModel = mongoose.models.song || mongoose.model("song", songSchema);

export default songModel;
