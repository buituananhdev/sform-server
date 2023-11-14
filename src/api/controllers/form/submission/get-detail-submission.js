import { Submission, Answer } from "../../../../models/index.js";
export default async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
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
    
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    const submissionDetails = {
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

    res.json(submissionDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
