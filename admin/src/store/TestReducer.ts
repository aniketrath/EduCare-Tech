import { createSlice } from '@reduxjs/toolkit';

interface Test {
	id: string;
	title: string;
	isCompleted: boolean;
}

export interface Question {
	id: string;
	question: string;
	option1: string;
	option2: string;
	option3: string;
	option4: string;
	answer: string;
}

export interface TestState {
	upcoming: Test[];
	ongoing: Test[];
	past: Test[];
	title: string;
	startDate: string;
	endDate: string;
	questions: Question[];
	time: number;
}

const initialState: TestState = {
	upcoming: [],
	ongoing: [],
	past: [],
	title: '',
	startDate: '',
	endDate: '',
	questions: [],
	time: 0,
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
		setTestTitle: (state, action) => {
			state.title = action.payload;
		},
		setTestStartDate: (state, action) => {
			state.startDate = action.payload;
		},
		setTestEndDate: (state, action) => {
			state.endDate = action.payload;
		},
		addQuestion: (state, action) => {
			const { id, question, option1, option2, option3, option4, answer } = action.payload;

			state.questions.push({
				id,
				question,
				option1,
				option2,
				option3,
				option4,
				answer,
			});
		},
		removeQuestion: (state, action) => {
			const id = action.payload;
			state.questions = state.questions.filter((question) => question.id !== id);
		},
		updateQuestion: (state, action) => {
			const { id, question, option1, option2, option3, option4, answer } = action.payload;
			const index = state.questions.findIndex((question) => question.id === id);
			state.questions[index] = {
				id,
				question,
				option1,
				option2,
				option3,
				option4,
				answer,
			};
		},
		resetTestDetails: (state) => {
			state.title = '';
			state.startDate = '';
			state.endDate = '';
			state.questions = [];
			state.time = 0;
		},
		setTestQuestions: (state, action) => {
			state.questions = action.payload;
		},
		setTestDetails: (state, action) => {
			const { title, startDate, endDate, questions } = action.payload;
			state.title = title;
			state.startDate = startDate;
			state.endDate = endDate;
			state.questions = questions;
		},
		setTestTime: (state, action) => {
			if (!isNaN(action.payload)) {
				state.time = action.payload;
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setTest,
	setTestTitle,
	setTestStartDate,
	setTestEndDate,
	resetTestDetails,
	addQuestion,
	removeQuestion,
	updateQuestion,
	setTestQuestions,
	setTestDetails,
	setTestTime,
} = testSlice.actions;

export default testSlice.reducer;
