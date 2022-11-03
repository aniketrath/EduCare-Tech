import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
		name: '',
		email: '',
		photo: '',
	},
	reducers: {
		setLoggedIn: (state, action) => {
			const data = action.payload;
			if (data.success) {
				state.isLoggedIn = true;
				state.name = data.name;
				state.email = data.email;
				state.photo = data.photo;
			} else {
				state.isLoggedIn = false;
				state.name = '';
				state.email = '';
				state.photo = '';
			}
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.name = '';
			state.email = '';
			state.photo = '';
		},
	},
});

// Action creators are generated for each case reducer function
export const { setLoggedIn, logout } = authSlice.actions;

export default authSlice.reducer;
