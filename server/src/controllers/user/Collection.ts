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
		pdfs,
		videos,
	});
};

const result = (res: Response, status: number, data: string | number | object) => {
	res.status(status).json(data);
};
