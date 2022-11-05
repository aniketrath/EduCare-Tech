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
	tests: Test[];
	title: string;
	questions: Question[];
	time: number;
}

const initialState: TestState = {
	tests: [],
	title: '',
	questions: [],
	time: 0,
};

export const testSlice = createSlice({
	name: 'test',
	initialState: initialState,
	reducers: {
		setTest: (state, action) => {
			state.tests = action.payload;
		},
		setTestTitle: (state, action) => {
			state.title = action.payload;
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
			state.questions = [];
			state.time = 0;
		},
		setTestQuestions: (state, action) => {
			state.questions = action.payload;
		},
		setTestDetails: (state, action) => {
			const { title, questions, time } = action.payload;
			state.title = title;
			state.questions = questions;
			state.time = time;
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
	resetTestDetails,
	addQuestion,
	removeQuestion,
	updateQuestion,
	setTestQuestions,
	setTestDetails,
	setTestTime,
} = testSlice.actions;

export default testSlice.reducer;
