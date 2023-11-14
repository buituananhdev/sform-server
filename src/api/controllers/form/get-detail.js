import { Form } from "../../../models/index.js";
export default async (req, res) => {
  try {
    // Lấy thông tin form
    const form = await Form.findById(req.params.id)
      .populate("ownerId", "email name")
      .populate({
        path: "questions",
        model: "Question",
      })
      .exec();

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Tạo đối tượng formDetails theo định dạng yêu cầu
    const formDetails = {
      id: form._id,
      owner: {
        email: form.ownerId.email,
        name: form.ownerId.name,
      },
      title: form.title,
      description: form.description,
      questions: form.questions.map((question) => {
        const questionDetails = {
          id: question._id,
          label: question.label,
          type: question.type
        };

        if (question.validation) {
          questionDetails.validation = JSON.parse(question.validation);
        }

        if (question.type === "file") {
          questionDetails.file = question.file;
        } else if (
          question.type === "check_box" ||
          question.type === "drop_down"
        ) {
          questionDetails.options = question.options;
        }

        return questionDetails;
      }),
      shared_users: form.shared_users
    };

    // Trả về kết quả dưới dạng JSON
    res.json(formDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
