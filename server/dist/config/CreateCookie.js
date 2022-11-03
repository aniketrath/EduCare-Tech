"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCookie = exports.CreateAdminAuthCookie = exports.CreateAuthCookie = void 0;
const Admin_1 = __importDefault(require("../model/Admin"));
const User_1 = __importDefault(require("../model/User"));
const const_1 = require("../utils/const");
const JWT_EXPIRE_TIME = 3 * 60 * 1000;
const REFRESH_EXPIRE_TIME = 30 * 24 * 60 * 60 * 1000;
const CreateAuthCookie = (res, _user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res || !_user)
        return new Error('Parameters cannot be empty');
    const user = yield User_1.default.findById(_user._id).select('refreshTokens');
    if (!user)
        return new Error('User not found');
    const accessToken = user.getSignedToken();
    const refreshToken = user.getRefreshToken();
    res.cookie(const_1.JWT_COOKIE, accessToken, {
        sameSite: 'strict',
        expires: new Date(Date.now() + JWT_EXPIRE_TIME),
        httpOnly: true,
        secure: process.env.MODE !== 'development',
    });
    res.cookie(const_1.JWT_REFRESH_COOKIE, refreshToken, {
        sameSite: 'strict',
        expires: new Date(Date.now() + REFRESH_EXPIRE_TIME),
        httpOnly: true,
        secure: process.env.MODE !== 'development',
    });
});
exports.CreateAuthCookie = CreateAuthCookie;
const CreateAdminAuthCookie = (res, _user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res || !_user)
        return new Error('Parameters cannot be empty');
    const user = yield Admin_1.default.findById(_user._id).select('refreshTokens');
    if (!user)
        return new Error('User not found');
    const accessToken = user.getSignedToken();
    const refreshToken = user.getRefreshToken();
    res.cookie(const_1.JWT_COOKIE, accessToken, {
        sameSite: 'strict',
        expires: new Date(Date.now() + JWT_EXPIRE_TIME),
        httpOnly: true,
        secure: process.env.MODE !== 'development',
    });
    res.cookie(const_1.JWT_REFRESH_COOKIE, refreshToken, {
        sameSite: 'strict',
        expires: new Date(Date.now() + REFRESH_EXPIRE_TIME),
        httpOnly: true,
        secure: process.env.MODE !== 'development',
    });
});
exports.CreateAdminAuthCookie = CreateAdminAuthCookie;
const CreateCookie = (res, { name, value, expires }) => {
    if (!res || !name || !value)
        return new Error('Parameters cannot be empty');
    res.cookie(name, value, {
        sameSite: 'strict',
        expires: new Date(Date.now() + expires),
        httpOnly: true,
        secure: process.env.MODE !== 'development',
    });
};
exports.CreateCookie = CreateCookie;
//# sourceMappingURL=CreateCookie.js.map