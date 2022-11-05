import { Request, Response } from 'express';
import Collection from '../../model/Collection';
import Skill from '../../model/Skill';
import FileUpload from '../../utils/FileUpload';

export const AllSkills = async (req: Request, res: Response) => {
	const skills = await Skill.find().populate('pdfs videos');

	return result(
		res,
		200,
		skills.map((skill) => ({
			id: skill._id,
			title: skill.title,
			photo: skill.photo,
			pdfs:
				skill.pdfs.map((pdf) => ({
					id: pdf._id,
					title: pdf.title,
					link: pdf.link,
				})) || [],
			videos:
				skill.videos.map((video) => ({
					id: video._id,
					title: video.title,
					link: video.link,
				})) || [],
		}))
	);
};

export const SkillById = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) return result(res, 400, 'Skill id is required');

	const skill = await Skill.findById(id).populate('pdfs videos');
	if (!skill) return result(res, 404, 'Skill not found');

	return result(res, 200, {
		name: skill.title,
		photo: skill.photo,
		pdfs:
			skill.pdfs.map((pdf) => ({
				id: pdf._id,
				title: pdf.title,
				link: pdf.link,
			})) || [],
		videos:
			skill.videos.map((video) => ({
				id: video._id,
				title: video.title,
				link: video.link,
			})) || [],
	});
};

export const CreateSkill = async (req: Request, res: Response) => {
	let file: string | undefined;

	try {
		file = await FileUpload(req, res);
	} catch (err) {
		let message = '';
		if (err instanceof Error) {
			message = err.message;
		} else {
			message = err;
		}

		logger(message);
		return result(res, 500, message);
	}

	if (!file) {
		return result(res, 400, 'File is required');
	}

	const { title } = req.body;

	if (!title || !file) return result(res, 400, 'All fields are required');

	const skill = new Skill({
		title,
		photo: file,
	});

	try {
		await skill.save();
		return result(res, 200, 'Skill created successfully');
	} catch (error) {
		return result(res, 500, 'Something went wrong');
	}
};

export const AddResources = async (req: Request, res: Response) => {
	const { id } = req.params;
	let file: string | undefined;

	try {
		file = await FileUpload(req, res);
	} catch (err) {
		let message = '';
		if (err instanceof Error) {
			message = err.message;
		} else {
			message = err;
		}

		if (message !== 'No file uploaded.') {
			logger(message);
			return result(res, 500, message);
		}
	}

	const { title, link, type } = req.body;

	if (!title || (!file && !link)) return result(res, 400, 'All fields are required');

	const skill = await Skill.findById(id);

	if (!skill) return result(res, 404, 'Skill not found');

	const collection = await Collection.create({
		title,
		type: type,
		link: file || link,
	});

	if (collection.type === 'PDF') {
		skill.pdfs.push(collection);
	} else {
		skill.videos.push(collection);
	}

	try {
		await skill.save();
		return result(res, 200, 'Resource added successfully');
	} catch (error) {
		return result(res, 500, 'Something went wrong');
	}
};

export const DeleteSkillByID = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) return result(res, 400, 'Skill id is required');

	const skill = await Skill.findById(id);
	if (!skill) return result(res, 404, 'Skill not found');

	await skill.remove();

	return result(res, 200, 'Skill deleted successfully');
};

export const DeleteResourceByID = async (req: Request, res: Response) => {
	const { id, resourceID } = req.params;

	if (!id) return result(res, 400, 'Skill id is required');

	const skill = await Skill.findById(id);
	const resource = await Collection.findById(resourceID);
	if (!skill) {
		return result(res, 404, 'Program not found');
	} else if (!resource) {
		return result(res, 404, 'Resource not found');
	}

	if (resource.type === 'PDF') {
		skill.pdfs = skill.pdfs.filter((pdf) => pdf.toString() !== resourceID);
	} else {
		skill.videos = skill.videos.filter((video) => video.toString() !== resourceID);
	}

	await skill.save();
	await resource.remove();

	return result(res, 200, 'Resource deleted successfully');
};

const result = (res: Response, status: number, data: string | number | object) => {
	res.status(status).json(data);
};
