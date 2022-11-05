import { Question, setTestDetails } from '../store/ExamReducer';
import store from '../store/store';
import { setTest } from '../store/TestReducer';
import { showAlert } from '../store/UtilsReducer';
import Axios from './Axios';

const getTests = () => {
	return new Promise((resolve, reject) => {
		Axios.get('/tests/all')
			.then((res) => {
				store.dispatch(setTest(res.data));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to load tests. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const getTest = (id: string) => {
	return new Promise((resolve, reject) => {
		Axios.get('/tests/test/' + id)
			.then((res) => {
				store.dispatch(setTestDetails(res.data));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to load test. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const submitTest = (id: string, resultID: string, questions: Question[]) => {
	return new Promise((resolve, reject) => {
		Axios.post('/tests/submit/' + id, {
			questions,
			resultID,
		})
			.then((res) => {
				store.dispatch(
					showAlert('You have scored ' + res.data.score + ' out of ' + res.data.total)
				);
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to load test. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const showResult = (id: string | null) => {
	if (!id) {
		return store.dispatch(showAlert('Unable to load result. Please try again later.'));
	}

	return new Promise((resolve, reject) => {
		Axios.get('/tests/result/' + id)
			.then((res) => {
				const result = "You've scored " + res.data.score + ' out of ' + res.data.total;
				store.dispatch(showAlert(result));
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to load result. Please try again later.'));
				}
			});
	});
};

export { getTests, getTest, submitTest, showResult };
