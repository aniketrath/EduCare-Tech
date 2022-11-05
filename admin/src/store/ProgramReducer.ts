import { createSlice } from '@reduxjs/toolkit';

export interface Program {
	id: string;
	title: string;
	photo: string;
	pdfs: { title: string; link: string; id: string }[];
	videos: { title: string; link: string; id: string }[];
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
		removeProgram: (state, action) => {
			const { id } = action.payload;
			state.programs = state.programs.filter((program) => program.id !== id);
		},
		setSelectedProgram: (state, action) => {
			state.selectedProgram = action.payload;
		},
		removeResource: (state, action) => {
			const { id, resourceId } = action.payload;
			const program = state.programs.find((program) => program.id === id);
			if (program) {
				program.pdfs = program.pdfs.filter((pdf) => pdf.id !== resourceId);
				program.videos = program.videos.filter((video) => video.id !== resourceId);
				if (program.id === state.selectedProgram?.id) {
					state.selectedProgram = program;
				}
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { setLoading, setPrograms, setSelectedProgram, removeProgram, removeResource } =
	programSlice.actions;

export default programSlice.reducer;
