import mongoose from "mongoose";

interface ICollectionItem extends mongoose.Document {
	title: string;
	link: string;
	type?: 'PDF' | 'VIDEO';
	alone?: boolean;
}

export default ICollectionItem;
