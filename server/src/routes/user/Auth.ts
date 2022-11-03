import { Router } from 'express';
import { IsLoggedIn, Login, Logout } from '../../controllers/user/Auth';
import VerifyUser from '../../middleware/VerifyUser';

const authRouter = Router();

authRouter.route('/login').post(Login);
authRouter.route('/is-logged').get(IsLoggedIn);
authRouter.route('/logout').all(VerifyUser).post(Logout);

export default authRouter;
