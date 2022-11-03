import mongoose from 'mongoose';
import IQuestion from '../types/Question';

const QuestionSchema = new mongoose.Schema<IQuestion>(
	{
		question: { type: String },
		option1: { type: String },
		option2: { type: String },
		option3: { type: String },
		option4: { type: String },
		answer: {
			type: String,
			enum: ['1', '2', '3', '4'],
		},
	},
	{ timestamps: true }
);

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
