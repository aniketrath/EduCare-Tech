import { Router } from 'express';
import {
	AllCollections,
	CreateCollection,
	DeleteCollection,
} from '../../controllers/admin/Collection';
import VerifyUser from '../../middleware/VerifyAdmin';

const collectionsRouter = Router();

collectionsRouter.route('/all').all(VerifyUser).get(AllCollections);
collectionsRouter.route('/create').all(VerifyUser).post(CreateCollection);
collectionsRouter.route('/delete/:id').all(VerifyUser).post(DeleteCollection);

export default collectionsRouter;
