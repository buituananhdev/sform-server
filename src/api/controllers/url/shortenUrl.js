import shortid from "shortid";
import { Form } from "../../../models/index.js";

export default async (req, res) => {
  try {
    const form = req.form;

    if (form.shortId) {
      res.status(200).json({ shortUrl: form.shortId });
      return;
    }

    let shortUrl = shortid.generate();
    let existingUrl = await Form.findOne({ shortId: shortUrl });

    while (existingUrl) {
      shortUrl = shortid.generate();
      existingUrl = await Form.findOne({ shortId: shortUrl });
    }

    await Form.updateOne({ _id: form._id }, { shortId: shortUrl });

    res.status(200).json({ shortId: shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
