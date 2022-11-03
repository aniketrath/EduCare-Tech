import { createSlice } from '@reduxjs/toolkit';

export const utilsSlice = createSlice({
	name: 'utils',
	initialState: {
		alert: '',
	},
	reducers: {
		showAlert: (state, action) => {
			state.alert = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { showAlert } = utilsSlice.actions;

export default utilsSlice.reducer;
