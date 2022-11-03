import { Router } from 'express';
import { AllCollections } from '../../controllers/user/Collection';
import VerifyUser from '../../middleware/VerifyUser';

const collectionsRouter = Router();

collectionsRouter.route('/all').all(VerifyUser).get(AllCollections);

export default collectionsRouter;
