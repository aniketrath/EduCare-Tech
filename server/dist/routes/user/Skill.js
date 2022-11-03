"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Skill_1 = require("../../controllers/user/Skill");
const VerifyUser_1 = __importDefault(require("../../middleware/VerifyUser"));
const skillRouter = (0, express_1.Router)();
skillRouter.route('/all').all(VerifyUser_1.default).get(Skill_1.AllSkills);
skillRouter.route('/skill/:id').all(VerifyUser_1.default).get(Skill_1.SkillById);
exports.default = skillRouter;
//# sourceMappingURL=Skill.js.map