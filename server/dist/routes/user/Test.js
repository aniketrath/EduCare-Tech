"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Test_1 = require("../../controllers/user/Test");
const VerifyUser_1 = __importDefault(require("../../middleware/VerifyUser"));
const testRouter = (0, express_1.Router)();
testRouter.route('/all').all(VerifyUser_1.default).get(Test_1.AllTests);
testRouter.route('/test/:testID').all(VerifyUser_1.default).get(Test_1.TestByID);
testRouter.route('/submit/:testID').all(VerifyUser_1.default).post(Test_1.SubmitTest);
testRouter.route('/result/:testID').all(VerifyUser_1.default).get(Test_1.ResultTest);
exports.default = testRouter;
//# sourceMappingURL=Test.js.map