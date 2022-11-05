import { Router } from 'express';
import {
	AllPrograms,
	ProgramById,
	CreateProgram,
	AddResources,
	DeleteProgramByID,
	DeleteResourceByID,
} from '../../controllers/admin/Program';
import VerifyAdmin from '../../middleware/VerifyAdmin';

const programsRouter = Router();

programsRouter.route('/all').all(VerifyAdmin).get(AllPrograms);
programsRouter.route('/create').all(VerifyAdmin).post(CreateProgram);
programsRouter.route('/delete/:id').all(VerifyAdmin).post(DeleteProgramByID);
programsRouter.route('/add-resources/:id').all(VerifyAdmin).post(AddResources);
programsRouter.route('/delete-resource/:id/:resourceID').all(VerifyAdmin).post(DeleteResourceByID);

programsRouter.route('/programs/:id').all(VerifyAdmin).get(ProgramById);

export default programsRouter;
