import { createSlice } from '@reduxjs/toolkit';

interface Skill {
	id: string;
	title: string;
	photo: string;
	pdfs: { title: string; link: string; id: string }[];
	videos: { title: string; link: string; id: string }[];
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
		removeSkill: (state, action) => {
			const { id } = action.payload;
			state.skills = state.skills.filter((skill) => skill.id !== id);
		},
		setSelectedSkill: (state, action) => {
			state.selectedSkill = action.payload;
		},
		removeResource: (state, action) => {
			const { id, resourceId } = action.payload;
			const skill = state.skills.find((skill) => skill.id === id);
			if (skill) {
				skill.pdfs = skill.pdfs.filter((pdf) => pdf.id !== resourceId);
				skill.videos = skill.videos.filter((video) => video.id !== resourceId);
				if (skill.id === state.selectedSkill?.id) {
					state.selectedSkill = skill;
				}
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { setLoading, setSkills, setSelectedSkill, removeSkill, removeResource } =
	skillSlice.actions;

export default skillSlice.reducer;
