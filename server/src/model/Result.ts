import moment from 'moment';
import mongoose from 'mongoose';
import IResult from '../types/Result';

const ResultSchema = new mongoose.Schema<IResult>(
	{
		test: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Test',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		score: {
			type: Number,
		},
		submitted: {
			type: Boolean,
			default: false,
		},
		startedAt: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Result = mongoose.model('Result', ResultSchema);

export default Result;
