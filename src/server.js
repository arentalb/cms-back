import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import contentRouter from "./contecnt/contentRoutes.js";

dotenv.config();
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
//Routes
server.use("/api/content", contentRouter);

//Routes

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
