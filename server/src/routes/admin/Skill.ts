import { Router } from 'express';
import { AllSkills, SkillById, CreateSkill, AddResources } from '../../controllers/admin/Skill';
import VerifyAdmin from '../../middleware/VerifyAdmin';

const skillsRouter = Router();

skillsRouter.route('/all').all(VerifyAdmin).get(AllSkills);
skillsRouter.route('/create').all(VerifyAdmin).post(CreateSkill);
skillsRouter.route('/add-resources/:id').all(VerifyAdmin).post(AddResources);
skillsRouter.route('/skills/:id').all(VerifyAdmin).get(SkillById);

export default skillsRouter;
