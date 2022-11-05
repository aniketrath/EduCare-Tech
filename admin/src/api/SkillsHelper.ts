import { removeResource, removeSkill, setSkills } from '../store/SkillReducer';
import store from '../store/store';
import { showAlert } from '../store/UtilsReducer';
import Axios from './Axios';

interface Skill {
	id: string;
	title: string;
	photo: string;
}

const getSkills = () => {
	return new Promise((resolve, reject) => {
		Axios.get('/skills/all')
			.then((res) => {
				store.dispatch(setSkills(res.data));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to load skills. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const getSkill = (id: string) => {
	const skills = store.getState().skill.skills;
	const skill = skills.find((skill: Skill) => skill.id === id);
	return skill || null;
};

const createSkill = (title: string, file: File) => {
	const formData = new FormData();
	formData.append('title', title);
	formData.append('file', file);

	return new Promise((resolve, reject) => {
		Axios.post('/skills/create', formData, {
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
					store.dispatch(showAlert('Unable to create skill. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const addSkillResources = (
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
		Axios.post('/skills/add-resources/' + id, formData, {
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

const deleteSkill = (id: string) => {
	return new Promise((resolve, reject) => {
		Axios.post('/skills/delete/' + id)
			.then((res) => {
				store.dispatch(showAlert(res.data));
				store.dispatch(removeSkill(id));
				resolve(res.data);
			})
			.catch((err) => {
				if (err.response) {
					store.dispatch(showAlert(err.response.data));
				} else {
					store.dispatch(showAlert('Unable to delete skill. Please try again later.'));
				}
				console.log(err);
			});
	});
};

const deleteSkillResource = (id: string, resourceId: string) => {
	return new Promise((resolve, reject) => {
		Axios.post('/skills/delete-resource/' + id + '/' + resourceId)
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

export { getSkills, getSkill, createSkill, addSkillResources, deleteSkill, deleteSkillResource };
