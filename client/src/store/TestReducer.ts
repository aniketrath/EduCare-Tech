import { createSlice } from '@reduxjs/toolkit';

interface Test {
	id: string;
	title: string;
	isCompleted: boolean;
}

interface TestState {
	tests: Test[];
	query: string;
}

const initialState: TestState = {
	tests: [],
	query: '',
};

export const testSlice = createSlice({
	name: 'test',
	initialState: initialState,
	reducers: {
		setTest: (state, action) => {
			state.tests = action.payload;
		},
		setSearchQuery: (state, action) => {
			state.query = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setTest, setSearchQuery } = testSlice.actions;

export default testSlice.reducer;
