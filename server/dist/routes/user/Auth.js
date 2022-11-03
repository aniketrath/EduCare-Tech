"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../../controllers/user/Auth");
const VerifyUser_1 = __importDefault(require("../../middleware/VerifyUser"));
const authRouter = (0, express_1.Router)();
authRouter.route('/login').post(Auth_1.Login);
authRouter.route('/is-logged').get(Auth_1.IsLoggedIn);
authRouter.route('/logout').all(VerifyUser_1.default).post(Auth_1.Logout);
exports.default = authRouter;
//# sourceMappingURL=Auth.js.map