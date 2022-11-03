"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Test_1 = require("../../controllers/admin/Test");
const VerifyAdmin_1 = __importDefault(require("../../middleware/VerifyAdmin"));
const testRouter = (0, express_1.Router)();
testRouter.route('/all').all(VerifyAdmin_1.default).get(Test_1.AllTests);
testRouter.route('/create').all(VerifyAdmin_1.default).post(Test_1.CreateTest);
testRouter.route('/details/:testID').all(VerifyAdmin_1.default).get(Test_1.TestDetails);
testRouter.route('/responses/:testID').all(VerifyAdmin_1.default).get(Test_1.TestResponses);
testRouter.route('/save-question').all(VerifyAdmin_1.default).post(Test_1.SaveQuestion);
testRouter.route('/delete-question').all(VerifyAdmin_1.default).post(Test_1.DeleteQuestion);
testRouter.route('/:testID/update').all(VerifyAdmin_1.default).post(Test_1.UpdateTest);
exports.default = testRouter;
//# sourceMappingURL=Test.js.map