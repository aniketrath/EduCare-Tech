import axios from 'axios';
import store from '../store/store';
import { showAlert } from '../store/UtilsReducer';

// const ServerURL = 'https://adminapi.educaretech.org/';
const ServerURL = 'http://localhost:9001/';

const Axios = axios.create({
	baseURL: ServerURL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

Axios.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		if (!error.response && error.code === 'ERR_INTERNET_DISCONNECTED') {
			store.dispatch(showAlert('No internet connection. Please check your internet connection.'));
			return Promise.reject(error);
		}
		const originalRequest = error.config;
		if (error && error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const res = await RefreshToken();
			if (res) return Axios(originalRequest);
			else {
				window.location.assign('/auth');
			}
		}

		if (error && error.response && error.response.status === 404) {
			// window.location.assign('/not-found');
		}

		return Promise.reject(error);
	}
);

const RefreshToken = async () => {
	try {
		const { data } = await Axios.get(`/auth/is-logged`);
		return data.success;
	} catch (err) {
		return false;
	}
};

export default Axios;
export { ServerURL, RefreshToken };
