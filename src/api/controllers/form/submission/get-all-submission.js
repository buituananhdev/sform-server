import { Form, Submission, Question } from "../../../../models/index.js";
export default async (req, res) => {
  try {
    const form = req.form;
    const questions = await Question.find({ idForm: form._id });
    const questionLabels = questions.map((question) => {
      return question.label;
    });
    const submissions = await Submission.find({ formId: form._id })
      .populate("userId", "email name")
      .populate({
        path: "answers",
        model: "Answer",
        populate: {
          path: "questionId",
          model: "Question",
        },
      })
      .exec();

    const submissionsDetails = submissions.map((submission) => {
      const answersObject = submission.answers.reduce((acc, answer) => {
        acc[answer.questionId.label] = answer.value;
        return acc;
      }, {});

      return {
        id: submission._id,
        user: {
          userId: submission.userId._id,
          email: submission.userId.email,
          name: submission.userId.name,
        },
        answers: answersObject,
        createdAt: submission.createdAt,
        updatedAt: submission.updatedAt,
      };
    });

    res.json({
      formId: form._id,
      question_labels: questionLabels,
      submissions: submissionsDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
