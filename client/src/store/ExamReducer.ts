import { createSlice } from '@reduxjs/toolkit';

export type Question = {
	id: string;
	question: string;
	option1: string;
	option2: string;
	option3: string;
	option4: string;
	answer: string;
};

interface ExamState {
	questions: Question[];
	selected: number;
	startTime: number;
	time: number;
}

const initialState: ExamState = {
	questions: [],
	selected: 0,
	startTime: 0,
	time: 0,
};

export const testSlice = createSlice({
	name: 'exam',
	initialState: initialState,
	reducers: {
		setTestDetails: (state, action) => {
			state.questions = action.payload.questions;
			state.time = action.payload.time;
			state.startTime = Date.now();
		},
		setSelected: (state, action) => {
			state.selected = action.payload;
		},
		setSelectedOption: (state, action) => {
			state.questions[state.selected].answer = action.payload;
		},
		resetTestDetails: (state) => {
			state.questions = [];
			state.selected = 0;
			state.startTime = 0;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setTestDetails, setSelected, setSelectedOption, resetTestDetails } =
	testSlice.actions;

export default testSlice.reducer;
