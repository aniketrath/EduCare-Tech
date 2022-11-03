import mongoose from 'mongoose';
import ISkill from '../types/Skill';

const SkillSchema = new mongoose.Schema<ISkill>(
	{
		title: { type: String },
		photo: { type: String },
		pdfs: [{ type: Object }],
		videos: [{ type: Object }],
	},
	{ timestamps: true }
);

const Skill = mongoose.model('Skill', SkillSchema);

export default Skill;
