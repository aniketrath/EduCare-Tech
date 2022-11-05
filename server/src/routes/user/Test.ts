import { Router } from 'express';
import { AllTests, TestByID, SubmitTest } from '../../controllers/user/Test';
import VerifyUser from '../../middleware/VerifyUser';

const testRouter = Router();

testRouter.route('/all').all(VerifyUser).get(AllTests);
testRouter.route('/test/:testID').all(VerifyUser).get(TestByID);
testRouter.route('/submit/:testID').all(VerifyUser).post(SubmitTest);
// testRouter.route('/result/:testID').all(VerifyUser).get(ResultTest);

export default testRouter;
