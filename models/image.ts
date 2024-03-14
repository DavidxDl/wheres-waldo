import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  characters: [{ name: String, x: mongoose.SchemaTypes.Number, y: mongoose.SchemaTypes.Number }],
  scores: [{ name: String, score: Number }],
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;
