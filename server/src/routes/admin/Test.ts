import { Router } from 'express';
import {
	AllTests,
	CreateTest,
	TestDetails,
	SaveQuestion,
	DeleteQuestion,
	UpdateTest,
	TestResponses,
	DeleteTest,
} from '../../controllers/admin/Test';
import VerifyAdmin from '../../middleware/VerifyAdmin';

const testRouter = Router();

testRouter.route('/all').all(VerifyAdmin).get(AllTests);
testRouter.route('/create').all(VerifyAdmin).post(CreateTest);
testRouter.route('/details/:testID').all(VerifyAdmin).get(TestDetails);
testRouter.route('/responses/:testID').all(VerifyAdmin).get(TestResponses);
testRouter.route('/save-question').all(VerifyAdmin).post(SaveQuestion);
testRouter.route('/delete-question').all(VerifyAdmin).post(DeleteQuestion);
testRouter.route('/:testID/update').all(VerifyAdmin).post(UpdateTest);
testRouter.route('/:testID/delete').all(VerifyAdmin).post(DeleteTest);

export default testRouter;
