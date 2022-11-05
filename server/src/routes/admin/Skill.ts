import { Router } from 'express';
import {
	AllSkills,
	SkillById,
	CreateSkill,
	AddResources,
	DeleteSkillByID,
	DeleteResourceByID,
} from '../../controllers/admin/Skill';
import VerifyAdmin from '../../middleware/VerifyAdmin';

const skillsRouter = Router();

skillsRouter.route('/all').all(VerifyAdmin).get(AllSkills);
skillsRouter.route('/create').all(VerifyAdmin).post(CreateSkill);
skillsRouter.route('/delete/:id').all(VerifyAdmin).delete(DeleteSkillByID);
skillsRouter.route('/add-resources/:id').all(VerifyAdmin).post(AddResources);
skillsRouter.route('/delete-resource/:id/:resourceID').all(VerifyAdmin).delete(DeleteResourceByID);
skillsRouter.route('/skills/:id').all(VerifyAdmin).get(SkillById);

export default skillsRouter;
