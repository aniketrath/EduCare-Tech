import { createSlice } from '@reduxjs/toolkit';

interface Test {
	id: string;
	title: string;
	isCompleted: boolean;
}

interface TestState {
	upcoming: Test[];
	ongoing: Test[];
	past: Test[];
}

const initialState: TestState = {
	upcoming: [],
	ongoing: [],
	past: [],
};

export const testSlice = createSlice({
	name: 'test',
	initialState: initialState,
	reducers: {
		setTest: (state, action) => {
			const { upcoming, ongoing, past } = action.payload;
			state.upcoming = upcoming;
			state.ongoing = ongoing;
			state.past = past;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setTest } = testSlice.actions;

export default testSlice.reducer;
