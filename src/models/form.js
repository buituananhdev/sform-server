import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const formSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  requiredAuth: {
    type: Boolean,
    default: false
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
},
  {
    timestamps: true
  });

const Form = model('Form', formSchema)
export default Form