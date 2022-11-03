import { Request, Response } from 'express';
import Collection from '../../model/Collection';
import Program from '../../model/Program';
import FileUpload from '../../utils/FileUpload';

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

	const program = await Program.findById(id).populate('pdfs videos');
	if (!program) return result(res, 404, 'Program not found');

	return result(res, 200, {
		name: program.title,
		photo: program.photo,
		pdfs: program.pdfs,
		videos: program.videos,
	});
};

export const CreateProgram = async (req: Request, res: Response) => {
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

	const program = new Program({
		title,
		photo: file,
	});

	try {
		await program.save();
		return result(res, 200, 'Program created successfully');
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

	const program = await Program.findById(id);

	if (!program) return result(res, 404, 'Program not found');

	const collection = await Collection.create({
		title,
		type: type,
		link: file || link,
	});

	if (collection.type === 'PDF') {
		program.pdfs.push(collection);
	} else {
		program.videos.push(collection);
	}

	try {
		await program.save();
		return result(res, 200, 'Resource added successfully');
	} catch (error) {
		return result(res, 500, 'Something went wrong');
	}
};

export const DeleteProgramByID = async (req: Request, res: Response) => {
	const { id } = req.params;

	if (!id) return result(res, 400, 'Program id is required');

	const program = await Program.findById(id);
	if (!program) return result(res, 404, 'Program not found');

	await Program.findByIdAndDelete(id);
};

const result = (res: Response, status: number, data: string | number | object) => {
	res.status(status).json(data);
};
