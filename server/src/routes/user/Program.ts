import { Router } from 'express';
import { AllPrograms, ProgramById } from '../../controllers/user/Program';
import VerifyUser from '../../middleware/VerifyUser';

const programsRouter = Router();

programsRouter.route('/all').all(VerifyUser).get(AllPrograms);
programsRouter.route('/programs/:id').all(VerifyUser).get(ProgramById);

export default programsRouter;
