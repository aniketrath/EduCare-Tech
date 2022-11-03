"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Program_1 = require("../../controllers/user/Program");
const VerifyUser_1 = __importDefault(require("../../middleware/VerifyUser"));
const programsRouter = (0, express_1.Router)();
programsRouter.route('/all').all(VerifyUser_1.default).get(Program_1.AllPrograms);
programsRouter.route('/programs/:id').all(VerifyUser_1.default).get(Program_1.ProgramById);
exports.default = programsRouter;
//# sourceMappingURL=Program.js.map