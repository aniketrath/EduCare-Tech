import { Router } from 'express';
import { AllCollections, CreateCollection } from '../../controllers/admin/Collection';
import VerifyUser from '../../middleware/VerifyAdmin';

const collectionsRouter = Router();

collectionsRouter.route('/all').all(VerifyUser).get(AllCollections);
collectionsRouter.route('/create').all(VerifyUser).post(CreateCollection);

export default collectionsRouter;
