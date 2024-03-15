import mongoose, { Document, Schema } from "mongoose";


// Define the interface representing the document structure
interface ImageDocument extends Document {
  characters: { name: string; x: number; y: number }[];
  scores: { name: string; score: number }[];
}

// Define the model type
interface ImageModel extends Model<ImageDocument> { }

const imageSchema = new mongoose.Schema({
  characters: [{ name: String, x: mongoose.Schema.Types.Number, y: mongoose.Schema.Types.Number }],
  scores: [{ name: String, score: Number }],
});

const Image: ImageModel = mongoose.models.Image || mongoose.model<ImageDocument, ImageModel>("Image", imageSchema);

export default Image;
