"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Skill_1 = require("../../controllers/admin/Skill");
const VerifyAdmin_1 = __importDefault(require("../../middleware/VerifyAdmin"));
const skillsRouter = (0, express_1.Router)();
skillsRouter.route('/all').all(VerifyAdmin_1.default).get(Skill_1.AllSkills);
skillsRouter.route('/create').all(VerifyAdmin_1.default).post(Skill_1.CreateSkill);
skillsRouter.route('/add-resources/:id').all(VerifyAdmin_1.default).post(Skill_1.AddResources);
skillsRouter.route('/skills/:id').all(VerifyAdmin_1.default).get(Skill_1.SkillById);
exports.default = skillsRouter;
//# sourceMappingURL=Skill.js.map