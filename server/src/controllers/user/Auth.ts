import { Request, Response } from 'express';
import { CreateAuthCookie, CreateCookie } from '../../config/CreateCookie';
import User from '../../model/User';
import {
	GOOGLE_API_FETCH,
	JWT_COOKIE,
	JWT_REFRESH_COOKIE,
	RESET_TOKEN_COOKIE,
} from '../../utils/const';
import fetch from 'node-fetch';

type ResponseData = { email: string; name: string; picture: string } | null;

export const Login = async (req: Request, res: Response) => {
	const { access_token } = req.body;
	if (!access_token) return result(res, 400, 'Access token not found');

	let profile: ResponseData = null;

	try {
		const response = await fetch(`${GOOGLE_API_FETCH}${access_token}`, {
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
		});
		const _data = await response.json();
		profile = _data as ResponseData;
	} catch (err) {
		result(res, 500, 'Google Login Failed');
	}
	if (!profile) return result(res, 500, 'Google Login Failed');

	let user = await User.findOne({ email: profile.email });

	if (!user) {
		user = await User.create({
			email: profile.email,
			name: profile.name,
			photo: profile.picture,
		});
	}

	await CreateAuthCookie(res, user);
	return result(res, 200, {
		name: user.name,
		email: user.email,
		photo: user.photo,
	});
};

export const IsLoggedIn = async (req: Request, res: Response) => {
	const refreshToken = req.cookies[JWT_REFRESH_COOKIE];
	if (!refreshToken) {
		return result(res, 200, {
			success: false,
		});
	}

	const user = await User.findOne({ refreshTokens: refreshToken });
	if (!user) {
		return result(res, 200, {
			success: false,
		});
	}

	return result(res, 200, {
		success: true,
		name: user.name,
		email: user.email,
		photo: user.photo,
	});
};

export const Logout = async (req: Request, res: Response) => {
	res.clearCookie(JWT_COOKIE);
	res.clearCookie(JWT_REFRESH_COOKIE);

	const user = await User.findById(req.user._id).select('refreshTokens');
	if (user) {
		user.refreshTokens = user.refreshTokens.filter(
			(token) => token !== req.cookies[JWT_REFRESH_COOKIE]
		);
		await user.save();
	}
	return result(res, 200, 'Logout successfully.');
};

const result = (res: Response, status: number, data: string | number | object) => {
	res.status(status).json(data);
};
