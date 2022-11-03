import { Router } from 'express';
import { AllSkills, SkillById } from '../../controllers/user/Skill';
import VerifyUser from '../../middleware/VerifyUser';

const skillRouter = Router();

skillRouter.route('/all').all(VerifyUser).get(AllSkills);
skillRouter.route('/skill/:id').all(VerifyUser).get(SkillById);

export default skillRouter;
