import { removeCollection, setCollections } from '../store/CollectionReducer';
import store from '../store/store';
import { showAlert } from '../store/UtilsReducer';
import Axios from './Axios';

const getCollections = () => {
	return new Promise((resolve, reject) => {
		Axios.get('/collections/all')
			.then((res) => {
				store.dispatch(setCollections(res.data));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to load collections. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const createCollection = (data: {
	title: string;
	file: File | null;
	link: string;
	type: string;
}) => {
	const formData = new FormData();

	formData.append('title', data.title);
	formData.append('type', data.type);
	formData.append('link', data.link);
	if (data.file) {
		formData.append('file', data.file);
	}

	return new Promise((resolve, reject) => {
		Axios.post('/collections/create', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
			.then((res) => {
				store.dispatch(showAlert(res.data));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to create collection. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const deleteCollection = (id: string) => {
	return new Promise((resolve, reject) => {
		Axios.post(`/collections/delete/${id}`)
			.then((res) => {
				store.dispatch(showAlert(res.data));
				store.dispatch(removeCollection(id));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to delete collection. Please try again later.'));
				}
				console.log(err);
			});
	});
};

export { getCollections, createCollection, deleteCollection };
