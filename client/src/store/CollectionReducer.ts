import { createSlice } from '@reduxjs/toolkit';

interface Item {
	title: string;
	link: string;
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
	},
});

// Action creators are generated for each case reducer function
export const { setCollections } = collectionsSlice.actions;

export default collectionsSlice.reducer;
