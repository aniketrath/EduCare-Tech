import { Request, Response } from 'express';
import Collection from '../../model/Collection';
import FileUpload from '../../utils/FileUpload';

export const AllCollections = async (req: Request, res: Response) => {
	const collections = await Collection.find({
		alone: true,
	});

	const pdfs = collections.filter((collection) => collection.type === 'PDF');
	const videos = collections.filter((collection) => collection.type === 'VIDEO');

	return result(res, 200, {
		pdfs:
			pdfs.map((pdf) => ({
				id: pdf._id,
				title: pdf.title,
				link: pdf.link,
			})) || [],
		videos:
			videos.map((video) => ({
				id: video._id,
				title: video.title,
				link: video.link,
			})) || [],
	});
};

export const CreateCollection = async (req: Request, res: Response) => {
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

	await Collection.create({
		title,
		type: type,
		link: file || link,
		alone: true,
	});

	return result(res, 200, 'Collection created successfully');
};

export const DeleteCollection = async (req: Request, res: Response) => {
	const { id } = req.params;

	const collection = await Collection.findById(id);

	if (!collection || !collection.alone) return result(res, 404, 'Collection not found');

	await collection.delete();

	return result(res, 200, 'Collection deleted successfully');
};

const result = (res: Response, status: number, data: string | number | object) => {
	res.status(status).json(data);
};
