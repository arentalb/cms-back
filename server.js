import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import contentRouter from "./src/contecnt/contentRoutes.js";
import cors from "cors";

dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

// Serve translation files
// server.use("/locales", express.static(join(__dirname, "locales")));

// Routes
server.use("/api/content", contentRouter);

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {}).then(() => {
  console.log("connected");
});

const port = process.env.PORT || 6060;
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
