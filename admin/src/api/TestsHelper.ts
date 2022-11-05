import store from '../store/store';
import { Question, setTest, TestState } from '../store/TestReducer';
import { showAlert } from '../store/UtilsReducer';
import Axios from './Axios';

type NewTest = {
	title: string;
	time: number;
};

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

const createTest = (test: NewTest) => {
	const { title, time } = test;

	return new Promise((resolve, reject) => {
		Axios.post('/tests/create', { title, time })
			.then((res) => {
				store.dispatch(showAlert('Test created successfully.'));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to create test. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const fetchTestDetails = (testID: string) => {
	if (!testID) {
		return Promise.reject('Invalid test ID');
	}
	return new Promise((resolve, reject) => {
		Axios.get(`/tests/details/${testID}`)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to load test details. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const saveQuestion = (question: Question) => {
	if (
		!question.question ||
		!question.option1 ||
		!question.option2 ||
		!question.option3 ||
		!question.option4 ||
		!question.answer
	) {
		return Promise.reject('Invalid question');
	}
	return new Promise((resolve, reject) => {
		Axios.post('/tests/save-question', question)
			.then((res) => {
				store.dispatch(showAlert('Question saved successfully.'));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to save question. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const deleteQuestion = (question: Question) => {
	if (!question.id) {
		return Promise.reject('Invalid question');
	}
	return new Promise((resolve, reject) => {
		Axios.post(`/tests/delete-question`, question)
			.then((res) => {
				store.dispatch(showAlert('Question deleted successfully.'));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to delete question. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const saveQuestions = (id: string, state: TestState) => {
	return new Promise((resolve, reject) => {
		Axios.post(`/tests/${id}/update`, state)
			.then((res) => {
				store.dispatch(showAlert('Questions saved successfully.'));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to save questions. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const getTestResponses = (id: string) => {
	return new Promise((resolve, reject) => {
		Axios.get('/tests/responses/' + id)
			.then((res) => {
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

export {
	getTests,
	createTest,
	fetchTestDetails,
	saveQuestion,
	deleteQuestion,
	saveQuestions,
	getTestResponses,
};
