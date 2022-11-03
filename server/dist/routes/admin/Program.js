"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Program_1 = require("../../controllers/admin/Program");
const VerifyAdmin_1 = __importDefault(require("../../middleware/VerifyAdmin"));
const programsRouter = (0, express_1.Router)();
programsRouter.route('/all').all(VerifyAdmin_1.default).get(Program_1.AllPrograms);
programsRouter.route('/create').all(VerifyAdmin_1.default).post(Program_1.CreateProgram);
programsRouter.route('/add-resources/:id').all(VerifyAdmin_1.default).post(Program_1.AddResources);
programsRouter.route('/programs/:id').all(VerifyAdmin_1.default).get(Program_1.ProgramById);
exports.default = programsRouter;
//# sourceMappingURL=Program.js.map