import mongoose from 'mongoose';
import ICollectionItem from '../types/CollectionItem';

const CollectionSchema = new mongoose.Schema<ICollectionItem>(
	{
		type: { type: String },
		title: { type: String },
		link: { type: String },
		alone: { type: Boolean },
	},
	{ timestamps: true }
);

const Collection = mongoose.model('Collection', CollectionSchema);

export default Collection;
