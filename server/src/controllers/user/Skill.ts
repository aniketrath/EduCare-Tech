import { Request, Response } from 'express';
import Skill from '../../model/Skill';

export const AllSkills = async (req: Request, res: Response) => {
	const skills = await Skill.find();

	return result(
		res,
		200,

		skills.map((skill) => ({
			id: skill._id,
			title: skill.title,
			photo: skill.photo,
			pdfs: skill.pdfs || [],
			videos: skill.videos || [],
		}))
	);
};
export const SkillById = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) return result(res, 400, 'Skill id is required');

	const skill = await Skill.findById(id);
	if (!skill) return result(res, 404, 'Skill not found');

	return result(res, 200, {
		name: skill.title,
		photo: skill.photo,
		pdfs: skill.pdfs,
		videos: skill.videos,
	});
};

const result = (res: Response, status: number, data: string | number | object) => {
	res.status(status).json(data);
};
