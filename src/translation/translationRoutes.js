import express from "express";
import {
  createTranslation,
  getTranslation,
  updateTranslation,
} from "./translationController.js";

const router = express.Router();

router.get("/translation/:lng/:ns", getTranslation);
router.post("/translation", createTranslation);
router.put("/translation", updateTranslation);

export default router;
