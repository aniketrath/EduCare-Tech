"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminSchema = new mongoose_1.default.Schema({
    email: { type: String },
    name: { type: String },
    photo: { type: String },
    refreshTokens: [{ type: String, select: false }],
}, { timestamps: true });
AdminSchema.methods.getSignedToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
AdminSchema.methods.getRefreshToken = function () {
    const token = jsonwebtoken_1.default.sign({ id: this._id }, process.env.REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_EXPIRE,
    });
    if (!this.refreshTokens)
        this.refreshTokens = [];
    this.refreshTokens.push(token);
    this.save();
    return token;
};
const Admin = mongoose_1.default.model('Admin', AdminSchema);
exports.default = Admin;
//# sourceMappingURL=Admin.js.map