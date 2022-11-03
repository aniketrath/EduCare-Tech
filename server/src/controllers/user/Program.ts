import { Request, Response } from 'express';
import Program from '../../model/Program';

export const AllPrograms = async (req: Request, res: Response) => {
	const programs = await Program.find();

	return result(
		res,
		200,
		programs.map((program) => ({
			id: program._id,
			title: program.title,
			photo: program.photo,
			pdfs: program.pdfs || [],
			videos: program.videos || [],
		}))
	);
};
export const ProgramById = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) return result(res, 400, 'Program id is required');

	const program = await Program.findById(id);
	if (!program) return result(res, 404, 'Program not found');

	return result(res, 200, {
		name: program.title,
		photo: program.photo,
		pdfs: program.pdfs,
		videos: program.videos,
	});
};

const result = (res: Response, status: number, data: string | number | object) => {
	res.status(status).json(data);
};
