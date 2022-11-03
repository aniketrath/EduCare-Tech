import { setSkills } from '../store/SkillReducer';
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

export { getSkills, getSkill };
