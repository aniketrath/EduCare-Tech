import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import IUser from '../types/User';

const AdminSchema = new mongoose.Schema<IUser>(
	{
		email: { type: String },
		name: { type: String },
		photo: { type: String },
		refreshTokens: [{ type: String, select: false }],
	},
	{ timestamps: true }
);

AdminSchema.methods.getSignedToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

AdminSchema.methods.getRefreshToken = function () {
	const token = jwt.sign({ id: this._id }, process.env.REFRESH_SECRET!, {
		expiresIn: process.env.REFRESH_EXPIRE,
	});
	if (!this.refreshTokens) this.refreshTokens = [];

	this.refreshTokens.push(token);
	this.save();
	return token;
};

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
