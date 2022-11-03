import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
	email: string;
	name: string;
	photo: string;
	refreshTokens: string[];

	getSignedToken(): string;
	getRefreshToken(): string;
}

export default IUser;
