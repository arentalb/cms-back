import mongoose from "mongoose";

const staticTextSchema = new mongoose.Schema({
  key: String,
  language: String,
  text: String,
});

const StaticText = mongoose.model("StaticText", staticTextSchema);

export default StaticText;
