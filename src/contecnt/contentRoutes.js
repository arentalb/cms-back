// routes/content.js
import express from "express";
import Content from "./contentModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const content = await Content.find();
  res.send(content);
});
router.get("/:language", async (req, res) => {
  const { language } = req.params;
  const content = await Content.findOne({ language });
  res.send(content);
});

router.post("/", async (req, res) => {
  const { language, title, description, button } = req.body;
  await Content.findOneAndUpdate(
    { language },
    { language, title, description, button },
    { upsert: true },
  );
  res.send("Content updated");
});

export default router;
