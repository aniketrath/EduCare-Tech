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
	return program || null;
};

export { getPrograms, getProgram };
