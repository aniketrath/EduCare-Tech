import { createSlice } from '@reduxjs/toolkit';

interface Skill {
	id: string;
	title: string;
	photo: string;
	pdfs: { title: string; link: string }[];
	videos: { title: string; link: string }[];
}
interface SkillState {
	skills: Skill[];
	isLoading: boolean;
	selectedSkill: Skill | null;
}

const initialState: SkillState = {
	skills: [],
	isLoading: true,
	selectedSkill: null,
};

export const skillSlice = createSlice({
	name: 'skill',
	initialState: initialState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setSkills: (state, action) => {
			state.skills = action.payload;
			state.isLoading = false;
		},
		setSelectedSkill: (state, action) => {
			state.selectedSkill = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setLoading, setSkills, setSelectedSkill } = skillSlice.actions;

export default skillSlice.reducer;
