interface ICollectionItem {
	title: string;
	link: string;
	type?: 'PDF' | 'VIDEO';
	alone?: boolean;
}

export default ICollectionItem;
