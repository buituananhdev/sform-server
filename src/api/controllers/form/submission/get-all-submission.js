import {
  Form,
  Submission,
  Question
} from "../../../../models/index.js";
export default async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
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

    // Tạo một mảng chứa thông tin của từng submission
    const submissionsDetails = submissions.map((submission) => {
      return {
        id: submission._id,
        user: {
          userId: submission.userId._id,
          email: submission.userId.email,
          name: submission.userId.name,
        },
        answers: submission.answers.map((answer) => {
          return {
            questionLabel: answer.questionId.label,
            value: answer.value,
          };
        }),
        createdAt: submission.createdAt,
        updatedAt: submission.updatedAt,
      };
    });

    // Trả về kết quả dưới dạng JSON
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
