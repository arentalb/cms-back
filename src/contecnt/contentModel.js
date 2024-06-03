import mongoose from "mongoose";

const contentSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Content = mongoose.model("Content", contentSchema);

export default Content;
