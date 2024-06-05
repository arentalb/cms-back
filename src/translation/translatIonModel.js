import mongoose from "mongoose";

const translationSchema = new mongoose.Schema({
  language: { type: String, required: true },
  namespace: { type: String, required: true },
  key: { type: String, required: true },
  value: { type: String, required: true },
});

const Translation = mongoose.model("Translation", translationSchema);

export default Translation;
