import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const server = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.get("/locales/:lng/*", (req, res) => {
  const { lng } = req.params;
  const ns = req.params[0]; // Capture the rest of the path after the language parameter
  const filePath = path.join(__dirname, "locales", lng, ns);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});
//
// // Routes
// server.use("/api/content", contentRouter);
//
// const DB = process.env.DATABASE.replace(
//   "<password>",
//   process.env.DATABASE_PASSWORD,
// );
//
// mongoose.connect(DB, {}).then(() => {
//   console.log("connected");
// });

const port = process.env.PORT || 6060;
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
