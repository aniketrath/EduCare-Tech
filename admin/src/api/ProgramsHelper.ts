import { Program, removeProgram, removeResource, setPrograms } from '../store/ProgramReducer';
import store from '../store/store';
import { showAlert } from '../store/UtilsReducer';
import Axios from './Axios';

const getPrograms = () => {
	return new Promise((resolve, reject) => {
		Axios.get('/programs/all')
			.then((res) => {
				store.dispatch(setPrograms(res.data));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to load programs. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const getProgram = (id: string) => {
	const programs = store.getState().program.programs;

	const program = programs.find((program: Program) => program.id === id);

	return program || null;
};

const createProgram = (title: string, file: File) => {
	const formData = new FormData();
	formData.append('title', title);
	formData.append('file', file);

	return new Promise((resolve, reject) => {
		Axios.post('/programs/create', formData, {
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
					store.dispatch(showAlert('Unable to create program. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const deleteProgram = (id: string) => {
	return new Promise((resolve, reject) => {
		Axios.post('/programs/delete/' + id)
			.then((res) => {
				store.dispatch(showAlert(res.data));
				store.dispatch(removeProgram(id));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to delete program. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const addProgramResources = (
	id: string,
	data: {
		title: string;
		file: File | null;
		link: string;
		type: string;
	}
) => {
	const formData = new FormData();

	formData.append('title', data.title);
	formData.append('type', data.type);
	formData.append('link', data.link);
	if (data.file) {
		formData.append('file', data.file);
	}

	return new Promise((resolve, reject) => {
		Axios.post('/programs/add-resources/' + id, formData, {
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
					store.dispatch(showAlert('Unable to add resources. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const deleteProgramResource = (id: string, resourceId: string) => {
	return new Promise((resolve, reject) => {
		Axios.post('/programs/delete-resource/' + id + '/' + resourceId)
			.then((res) => {
				store.dispatch(showAlert(res.data));
				store.dispatch(removeResource({ id, resourceId }));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to delete resource. Please try again later.'));
				}
				console.log(err);
			});
	});
};

export {
	getPrograms,
	getProgram,
	createProgram,
	addProgramResources,
	deleteProgram,
	deleteProgramResource,
};
