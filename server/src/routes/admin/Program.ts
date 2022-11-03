import { Router } from 'express';
import {
	AllPrograms,
	ProgramById,
	CreateProgram,
	AddResources,
} from '../../controllers/admin/Program';
import VerifyAdmin from '../../middleware/VerifyAdmin';

const programsRouter = Router();

programsRouter.route('/all').all(VerifyAdmin).get(AllPrograms);
programsRouter.route('/create').all(VerifyAdmin).post(CreateProgram);
programsRouter.route('/add-resources/:id').all(VerifyAdmin).post(AddResources);
programsRouter.route('/programs/:id').all(VerifyAdmin).get(ProgramById);

export default programsRouter;
