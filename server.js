import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import translationRoutes from "./src/translation/translationRoutes.js";
import Translation from "./src/translation/translatIonModel.js";

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
  console.log(filePath);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB, {}).then(() => {
  console.log("connected");
  //insertTranslation();
});

// Routes
server.use("/api", translationRoutes);

const port = process.env.PORT || 6060;
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

async function insertTranslation() {
  const translations = [
    // Home page translations
    {
      language: "en",
      namespace: "home",
      key: "title",
      value: "English: Home Page",
    },
    {
      language: "en",
      namespace: "home",
      key: "content",
      value: "English: Welcome to the home page",
    },
    {
      language: "kr",
      namespace: "home",
      key: "title",
      value: "Kurdish: Kurdish title",
    },
    {
      language: "kr",
      namespace: "home",
      key: "content",
      value: "Kurdish: Kurdish content",
    },

    // About page translations
    {
      language: "en",
      namespace: "about",
      key: "title",
      value: "English: About Page",
    },
    {
      language: "en",
      namespace: "about",
      key: "content",
      value: "English: Welcome to the about page",
    },
    {
      language: "kr",
      namespace: "about",
      key: "title",
      value: "Kurdish: Kurdish about title",
    },
    {
      language: "kr",
      namespace: "about",
      key: "content",
      value: "Kurdish: Kurdish about content",
    },

    // Button translations
    {
      language: "en",
      namespace: "buttons",
      key: "submit",
      value: "English: Submit",
    },
    {
      language: "en",
      namespace: "buttons",
      key: "cancel",
      value: "English: Cancel",
    },
    {
      language: "kr",
      namespace: "buttons",
      key: "submit",
      value: "Kurdish: Kurdish submit",
    },
    {
      language: "kr",
      namespace: "buttons",
      key: "cancel",
      value: "Kurdish: Kurdish cancel",
    },

    // Footer translations
    {
      language: "en",
      namespace: "footer",
      key: "copyright",
      value: "English: © 2024 Company Name",
    },
    {
      language: "en",
      namespace: "footer",
      key: "contact",
      value: "English: Contact Us",
    },
    {
      language: "kr",
      namespace: "footer",
      key: "copyright",
      value: "Kurdish: © 2024 Kurdish Company Name",
    },
    {
      language: "kr",
      namespace: "footer",
      key: "contact",
      value: "Kurdish: Kurdish Contact Us",
    },

    // Header translations
    {
      language: "en",
      namespace: "header",
      key: "title",
      value: "English: Header Title",
    },
    {
      language: "en",
      namespace: "header",
      key: "subtitle",
      value: "English: Header Subtitle",
    },
    {
      language: "kr",
      namespace: "header",
      key: "title",
      value: "Kurdish: Kurdish Header Title",
    },
    {
      language: "kr",
      namespace: "header",
      key: "subtitle",
      value: "Kurdish: Kurdish Header Subtitle",
    },

    // Navigation translations
    { language: "en", namespace: "nav", key: "home", value: "English: Home" },
    {
      language: "kr",
      namespace: "nav",
      key: "home",
      value: "Kurdish: Kurdish Home",
    },
    { language: "en", namespace: "nav", key: "about", value: "English: About" },
    {
      language: "kr",
      namespace: "nav",
      key: "about",
      value: "Kurdish: Kurdish About",
    },
  ];

  try {
    await Translation.deleteMany();
    console.log("all translation deleted ");
    await Translation.insertMany(translations);
    console.log("Translations inserted");
  } catch (err) {
    console.error("Error inserting translations", error);
  } finally {
    await mongoose.connection.close();
  }
}
