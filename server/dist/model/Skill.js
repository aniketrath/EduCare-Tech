"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SkillSchema = new mongoose_1.default.Schema({
    title: { type: String },
    photo: { type: String },
    pdfs: [{ type: Object }],
    videos: [{ type: Object }],
}, { timestamps: true });
const Skill = mongoose_1.default.model('Skill', SkillSchema);
exports.default = Skill;
//# sourceMappingURL=Skill.js.map