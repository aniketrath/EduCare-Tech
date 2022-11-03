import Axios from './Axios';
import store from '../store/store';
import { setLoggedIn } from '../store/AuthReducer';

const IsLogged = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await Axios.get(`/auth/is-logged`);

			if (data.success) {
				store.dispatch(setLoggedIn(data));
				resolve(true);
			} else {
				store.dispatch(
					setLoggedIn({
						IsLoggedIn: false,
					})
				);
				resolve(false);
			}
		} catch (err) {
			store.dispatch(
				setLoggedIn({
					IsLoggedIn: false,
				})
			);
			resolve(false);
		}
	});
};

const Login = (access_token: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await Axios.post(`/auth/login`, {
				access_token,
			});
			store.dispatch(setLoggedIn(data));
			resolve(true);
		} catch (err) {
			store.dispatch(
				setLoggedIn({
					IsLoggedIn: false,
				})
			);
			resolve(false);
		}
	});
};

const Logout = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await Axios.post(`/auth/logout`);
			store.dispatch(
				setLoggedIn({
					IsLoggedIn: false,
				})
			);
			resolve(true);
		} catch (err) {
			store.dispatch(
				setLoggedIn({
					IsLoggedIn: false,
				})
			);
			resolve(true);
		}
	});
};

export { IsLogged, Login, Logout };
