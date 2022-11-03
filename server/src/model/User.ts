import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import IUser from '../types/User';

const UserSchema = new mongoose.Schema<IUser>(
	{
		email: { type: String },
		name: { type: String },
		photo: { type: String },
		refreshTokens: [{ type: String, select: false }],
	},
	{ timestamps: true }
);

UserSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

UserSchema.methods.getRefreshToken = function () {
	const token = jwt.sign({ id: this._id }, process.env.REFRESH_SECRET!, {
		expiresIn: process.env.REFRESH_EXPIRE,
	});
	if (!this.refreshTokens) this.refreshTokens = [];

	this.refreshTokens.push(token);
	this.save();
	return token;
};

const User = mongoose.model('User', UserSchema);

export default User;
