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
const jsonwebtoken_1 = require("jsonwebtoken");
const CreateCookie_1 = require("../config/CreateCookie");
const Admin_1 = __importDefault(require("../model/Admin"));
const const_1 = require("../utils/const");
const VerifyAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies[const_1.JWT_COOKIE];
    let user = null;
    let unauthorized = false;
    if (!token) {
        unauthorized = true;
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        user = yield Admin_1.default.findById(decoded.id);
    }
    catch (e) {
        unauthorized = true;
    }
    if (!user) {
        const refreshToken = req.cookies[const_1.JWT_REFRESH_COOKIE];
        user = yield Admin_1.default.findOne({ refreshTokens: refreshToken });
        unauthorized = !user;
    }
    if (unauthorized || !user) {
        return res.status(401).json('Unauthorized.');
    }
    else {
        yield (0, CreateCookie_1.CreateAdminAuthCookie)(res, user);
    }
    req.user = user;
    next();
});
exports.default = VerifyAdmin;
//# sourceMappingURL=VerifyAdmin.js.map