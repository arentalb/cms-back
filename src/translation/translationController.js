import catchAsync from "../catchAsync.js";
import Translation from "./translatIonModel.js";

export const getTranslation = catchAsync(async (req, res) => {
  const { lng, ns } = req.params;

  try {
    const translations = await Translation.find({
      language: lng,
      namespace: ns,
    });
    console.log(translations);
    if (translations.length > 0) {
      const response = translations.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {});
      res.json(response);
    } else {
      res.status(404).json({ error: "Translation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export const createTranslation = catchAsync(async (req, res) => {
  const { language, namespace, key, value } = req.body;

  try {
    const newTranslation = new Translation({ language, namespace, key, value });
    await newTranslation.save();
    res.status(201).json(newTranslation);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export const updateTranslation = catchAsync(async (req, res) => {
  const { language, namespace, key, value } = req.body;

  try {
    const translation = await Translation.findOneAndUpdate(
      { language, namespace, key },
      { value },
      { new: true, upsert: true }, // upsert: true will create the document if it doesn't exist
    );
    res.json(translation);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
