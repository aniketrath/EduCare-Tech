import mongoose from 'mongoose';
import ICollectionItem from './CollectionItem';

interface ISkill extends mongoose.Document {
	title: string;
	photo: string;
	pdfs: ICollectionItem[];
	videos: ICollectionItem[];
}

export default ISkill;
