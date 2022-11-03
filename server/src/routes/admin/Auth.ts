import { Router } from 'express';
import { IsLoggedIn, Login, Logout } from '../../controllers/admin/Auth';
import VerifyAdmin from '../../middleware/VerifyAdmin';

const authRouter = Router();

authRouter.route('/login').post(Login);
authRouter.route('/is-logged').get(IsLoggedIn);
authRouter.route('/logout').all(VerifyAdmin).post(Logout);

export default authRouter;
