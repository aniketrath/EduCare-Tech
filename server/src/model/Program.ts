import mongoose from 'mongoose';
import IProgram from '../types/Program';

const ProgramSchema = new mongoose.Schema<IProgram>(
	{
		title: { type: String },
		photo: { type: String },
		pdfs: [{ type: Object }],
		videos: [{ type: Object }],
	},
	{ timestamps: true }
);

const Program = mongoose.model('Program', ProgramSchema);

export default Program;
