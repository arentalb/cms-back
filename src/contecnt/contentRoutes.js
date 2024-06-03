import express from "express";
import contentController from "./contentController.js";

const router = express.Router();

//everyone
router.post("/", contentController.content);

export default router;
