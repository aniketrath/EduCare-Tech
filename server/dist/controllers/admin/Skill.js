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
exports.DeleteResourceByID = exports.DeleteSkillByID = exports.AddResources = exports.CreateSkill = exports.SkillById = exports.AllSkills = void 0;
const Collection_1 = __importDefault(require("../../model/Collection"));
const Skill_1 = __importDefault(require("../../model/Skill"));
const FileUpload_1 = __importDefault(require("../../utils/FileUpload"));
const fs_1 = __importDefault(require("fs"));
const AllSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const skills = yield Skill_1.default.find().populate('pdfs videos');
    return result(res, 200, skills.map((skill) => ({
        id: skill._id,
        title: skill.title,
        photo: skill.photo,
        pdfs: skill.pdfs.map((pdf) => ({
            id: pdf._id,
            title: pdf.title,
            link: pdf.link,
        })) || [],
        videos: skill.videos.map((video) => ({
            id: video._id,
            title: video.title,
            link: video.link,
        })) || [],
    })));
});
exports.AllSkills = AllSkills;
const SkillById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return result(res, 400, 'Skill id is required');
    const skill = yield Skill_1.default.findById(id).populate('pdfs videos');
    if (!skill)
        return result(res, 404, 'Skill not found');
    return result(res, 200, {
        name: skill.title,
        photo: skill.photo,
        pdfs: skill.pdfs.map((pdf) => ({
            id: pdf._id,
            title: pdf.title,
            link: pdf.link,
        })) || [],
        videos: skill.videos.map((video) => ({
            id: video._id,
            title: video.title,
            link: video.link,
        })) || [],
    });
});
exports.SkillById = SkillById;
const CreateSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let file;
    try {
        file = yield (0, FileUpload_1.default)(req, res);
    }
    catch (err) {
        let message = '';
        if (err instanceof Error) {
            message = err.message;
        }
        else {
            message = err;
        }
        logger(message);
        return result(res, 500, message);
    }
    if (!file) {
        return result(res, 400, 'File is required');
    }
    const { title } = req.body;
    if (!title || !file)
        return result(res, 400, 'All fields are required');
    const skill = new Skill_1.default({
        title,
        photo: file,
    });
    try {
        yield skill.save();
        return result(res, 200, 'Skill created successfully');
    }
    catch (error) {
        return result(res, 500, 'Something went wrong');
    }
});
exports.CreateSkill = CreateSkill;
const AddResources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let file;
    try {
        file = yield (0, FileUpload_1.default)(req, res);
    }
    catch (err) {
        let message = '';
        if (err instanceof Error) {
            message = err.message;
        }
        else {
            message = err;
        }
        if (message !== 'No file uploaded.') {
            logger(message);
            return result(res, 500, message);
        }
    }
    const { title, link, type } = req.body;
    if (!title || (!file && !link))
        return result(res, 400, 'All fields are required');
    const skill = yield Skill_1.default.findById(id);
    if (!skill)
        return result(res, 404, 'Skill not found');
    const collection = yield Collection_1.default.create({
        title,
        type: type,
        link: file || link,
    });
    if (collection.type === 'PDF') {
        skill.pdfs.push(collection);
    }
    else {
        skill.videos.push(collection);
    }
    try {
        yield skill.save();
        return result(res, 200, 'Resource added successfully');
    }
    catch (error) {
        return result(res, 500, 'Something went wrong');
    }
});
exports.AddResources = AddResources;
const DeleteSkillByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return result(res, 400, 'Skill id is required');
    const skill = yield Skill_1.default.findById(id);
    if (!skill)
        return result(res, 404, 'Skill not found');
    yield skill.remove();
    return result(res, 200, 'Skill deleted successfully');
});
exports.DeleteSkillByID = DeleteSkillByID;
const DeleteResourceByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, resourceID } = req.params;
    if (!id)
        return result(res, 400, 'Skill id is required');
    const skill = yield Skill_1.default.findById(id);
    const resource = yield Collection_1.default.findById(resourceID);
    if (!skill) {
        return result(res, 404, 'Program not found');
    }
    skill.pdfs = skill.pdfs.filter((pdf) => pdf._id.toString() !== resourceID);
    skill.videos = skill.videos.filter((video) => video._id.toString() !== resourceID);
    yield skill.save();
    if (resource) {
        try {
            yield fs_1.default.unlinkSync(__basedir + '/static/uploads/' + resource.link);
        }
        catch (e) { }
        yield resource.remove();
    }
    return result(res, 200, 'Resource deleted successfully');
});
exports.DeleteResourceByID = DeleteResourceByID;
const result = (res, status, data) => {
    res.status(status).json(data);
};
//# sourceMappingURL=Skill.js.map