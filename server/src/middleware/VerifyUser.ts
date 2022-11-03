import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { CreateAuthCookie } from '../config/CreateCookie';
import User from '../model/User';
import IUser from '../types/User';
import { JWT_COOKIE, JWT_REFRESH_COOKIE } from '../utils/const';
const VerifyUser = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies[JWT_COOKIE];

	let user: IUser | null = null;

	let unauthorized = false;

	if (!token) {
		unauthorized = true;
	}

	try {
		const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;
		user = await User.findById(decoded.id);
	} catch (e) {
		unauthorized = true;
	}

	if (!user) {
		const refreshToken = req.cookies[JWT_REFRESH_COOKIE];
		user = await User.findOne({ refreshTokens: refreshToken });
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

export default VerifyUser;
