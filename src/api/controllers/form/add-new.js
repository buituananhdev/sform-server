import { Form, Question } from "../../../models/index.js";
import shortid from "shortid";

export default async (req, res) => {
  try {
    let shortUrl = shortid.generate();
    let existingUrl = await Form.findOne({ shortId: shortUrl });

    while (existingUrl) {
      shortUrl = shortid.generate();
      existingUrl = await Form.findOne({ shortId: shortUrl });
    }

    const newForm = new Form({
      title: req.body.title,
      description: req.body.description,
      requiredAuth: req.body.requiredAuth,
      ownerId: req.user._id,
      shortId: shortUrl,
      shared_users: req.body.shared_users
    });
  
    const savedForm = await newForm.save();
    console.log(savedForm);

    const questions = req.body.questions.map((question) => ({
      idForm: savedForm._id,
      label: question.label,
      type: question.type,
      options: question.options,
      validation: JSON.stringify(question.validation),
    }));

    const savedQuestions = await Question.create(questions);

    savedForm.questions = savedQuestions.map((question) => question._id);
    await savedForm.save();
    res.status(200).json(savedForm)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
