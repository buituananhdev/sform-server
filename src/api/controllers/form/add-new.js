import { Form, Question } from "../../../models/index.js";
import { getUserIdFromToken } from "../../../utils/helpers/jwt-token-helper.js";
export default async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers["authorization"]);
    const newForm = new Form({
      title: req.body.title,
      description: req.body.description,
      requiredAuth: req.body.requiredAuth,
      ownerId: userId,
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
    console.log(error);
    res.status(500).json("loi server");
  }
};
