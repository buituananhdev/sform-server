import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const submissionSchema = new Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    require: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  answers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Answer',
  }],
},
  {
    timestamps: true
  });

const Submission = model('Submission', submissionSchema)
export default Submission