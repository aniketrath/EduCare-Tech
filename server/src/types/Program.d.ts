import mongoose from 'mongoose';
import ICollectionItem from './CollectionItem';

interface IProgram extends mongoose.Document {
	title: string;
	photo: string;
	pdfs: ICollectionItem[];
	videos: ICollectionItem[];
}

export default IProgram;
