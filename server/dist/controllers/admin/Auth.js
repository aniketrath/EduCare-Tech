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
exports.Logout = exports.IsLoggedIn = exports.Login = void 0;
const CreateCookie_1 = require("../../config/CreateCookie");
const Admin_1 = __importDefault(require("../../model/Admin"));
const const_1 = require("../../utils/const");
const node_fetch_1 = __importDefault(require("node-fetch"));
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { access_token } = req.body;
    if (!access_token)
        return result(res, 400, 'Access token not found');
    let profile = null;
    try {
        const response = yield (0, node_fetch_1.default)(`${const_1.GOOGLE_API_FETCH}${access_token}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        });
        const _data = yield response.json();
        profile = _data;
    }
    catch (err) {
        return result(res, 500, 'Google Login Failed');
    }
    if (!profile) {
        return result(res, 500, 'Google Login Failed');
    }
    if (profile.email !== process.env.ADMIN_EMAIL) {
        return result(res, 400, 'Admins are only allowed to login');
    }
    let user = yield Admin_1.default.findOne({ email: profile.email });
    if (!user) {
        user = yield Admin_1.default.create({
            email: profile.email,
            name: profile.name,
            photo: profile.picture,
        });
    }
    yield (0, CreateCookie_1.CreateAdminAuthCookie)(res, user);
    return result(res, 200, {
        name: user.name,
        email: user.email,
        photo: user.photo,
    });
});
exports.Login = Login;
const IsLoggedIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies[const_1.JWT_REFRESH_COOKIE];
    if (!refreshToken) {
        return result(res, 200, {
            success: false,
        });
    }
    const user = yield Admin_1.default.findOne({ refreshTokens: refreshToken });
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
});
exports.IsLoggedIn = IsLoggedIn;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie(const_1.JWT_COOKIE);
    res.clearCookie(const_1.JWT_REFRESH_COOKIE);
    const user = yield Admin_1.default.findById(req.user._id).select('refreshTokens');
    if (user) {
        user.refreshTokens = user.refreshTokens.filter((token) => token !== req.cookies[const_1.JWT_REFRESH_COOKIE]);
        yield user.save();
    }
    return result(res, 200, 'Logout successfully.');
});
exports.Logout = Logout;
const result = (res, status, data) => {
    res.status(status).json(data);
};
//# sourceMappingURL=Auth.js.map