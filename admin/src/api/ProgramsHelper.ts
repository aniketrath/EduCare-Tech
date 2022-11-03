import { setPrograms } from '../store/ProgramReducer';
import store from '../store/store';
import { showAlert } from '../store/UtilsReducer';
import Axios from './Axios';

interface Program {
	id: string;
	title: string;
	photo: string;
}

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
	if (!program) {
		return null;
	}
	const { title, photo, pdfs, videos } = program;
	return (
		{
			title,
			photo,
			pdfs: pdfs || [],
			videos: videos || [],
		} || null
	);
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

export { getPrograms, getProgram, createProgram, addProgramResources };
