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
exports.SkillById = exports.AllSkills = void 0;
const Skill_1 = __importDefault(require("../../model/Skill"));
const AllSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const skills = yield Skill_1.default.find();
    return result(res, 200, skills.map((skill) => ({
        id: skill._id,
        title: skill.title,
        photo: skill.photo,
        pdfs: skill.pdfs || [],
        videos: skill.videos || [],
    })));
});
exports.AllSkills = AllSkills;
const SkillById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return result(res, 400, 'Skill id is required');
    const skill = yield Skill_1.default.findById(id);
    if (!skill)
        return result(res, 404, 'Skill not found');
    return result(res, 200, {
        name: skill.title,
        photo: skill.photo,
        pdfs: skill.pdfs,
        videos: skill.videos,
    });
});
exports.SkillById = SkillById;
const result = (res, status, data) => {
    res.status(status).json(data);
};
//# sourceMappingURL=Skill.js.map