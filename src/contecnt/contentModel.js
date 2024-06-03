// models/Content.js
import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  language: String,
  title: String,
  description: String,
  button: String,
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
