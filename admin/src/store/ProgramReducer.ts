import { createSlice } from '@reduxjs/toolkit';

interface Program {
	id: string;
	title: string;
	photo: string;
	pdfs: { title: string; link: string }[];
	videos: { title: string; link: string }[];
}
interface ProgramState {
	programs: Program[];
	isLoading: boolean;
	selectedProgram: Program | null;
}

const initialState: ProgramState = {
	programs: [],
	isLoading: true,
	selectedProgram: null,
};

export const programSlice = createSlice({
	name: 'program',
	initialState: initialState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setPrograms: (state, action) => {
			state.programs = action.payload;
			state.isLoading = false;
		},
		setSelectedProgram: (state, action) => {
			state.selectedProgram = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setLoading, setPrograms, setSelectedProgram } = programSlice.actions;

export default programSlice.reducer;
