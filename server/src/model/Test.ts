import mongoose from 'mongoose';
import ITest from '../types/Test';

const TestSchema = new mongoose.Schema<ITest>(
	{
		title: { type: String },
		questions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Question',
			},
		],
		time: { type: Number },
	},
	{ timestamps: true }
);

const Test = mongoose.model('Test', TestSchema);

export default Test;
