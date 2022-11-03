import { setCollections } from '../store/CollectionReducer';
import store from '../store/store';
import { showAlert } from '../store/UtilsReducer';
import Axios from './Axios';

const getCollections = () => {
	const collections = store.getState().collection;
	if (collections.pdfs.length !== 0 && collections.videos.length !== 0) {
		return Promise.resolve(collections);
	}

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

export { getCollections };
