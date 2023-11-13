import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const questionSchema = new Schema({
  idForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'radio', 'check_box', 'drop_down', 'file'],
    default: 'text'
  },
  validation: {
    type: String,
  },
  options: {
    type: [String],
  }
},
  {
    timestamps: true
  });

const Question = model('Question', questionSchema)
export default Question