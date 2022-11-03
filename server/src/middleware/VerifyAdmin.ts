import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { CreateAdminAuthCookie as CreateAuthCookie } from '../config/CreateCookie';
import Admin from '../model/Admin';
import IUser from '../types/User';
import { JWT_COOKIE, JWT_REFRESH_COOKIE } from '../utils/const';
const VerifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies[JWT_COOKIE];

	let user: IUser | null = null;

	let unauthorized = false;

	if (!token) {
		unauthorized = true;
	}

	try {
		const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;
		user = await Admin.findById(decoded.id);
	} catch (e) {
		unauthorized = true;
	}

	if (!user) {
		const refreshToken = req.cookies[JWT_REFRESH_COOKIE];
		user = await Admin.findOne({ refreshTokens: refreshToken });
		unauthorized = !user;
	}

	if (unauthorized || !user) {
		return res.status(401).json('Unauthorized.');
	} else {
		await CreateAuthCookie(res, user);
	}

	req.user = user;
	next();
};

export default VerifyAdmin;
