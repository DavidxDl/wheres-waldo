import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  characters: {
    type: Object,
    default: [],
  },
});

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;
