import { createSlice } from '@reduxjs/toolkit';

interface Item {
	title: string;
	link: string;
	id: string;
}
interface CollectionsState {
	pdfs: Item[];
	videos: Item[];
}

const initialState: CollectionsState = {
	pdfs: [],
	videos: [],
};

export const collectionsSlice = createSlice({
	name: 'collections',
	initialState: initialState,
	reducers: {
		setCollections: (state, action) => {
			const { pdfs, videos } = action.payload;
			state.pdfs = pdfs;
			state.videos = videos;
		},
		removeCollection: (state, action) => {
			const { id } = action.payload;
			state.pdfs = state.pdfs.filter((pdf) => pdf.id !== id);
			state.videos = state.videos.filter((video) => video.id !== id);
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCollections, removeCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;
