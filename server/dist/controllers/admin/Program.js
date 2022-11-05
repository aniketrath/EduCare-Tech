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
exports.DeleteResourceByID = exports.DeleteProgramByID = exports.AddResources = exports.CreateProgram = exports.ProgramById = exports.AllPrograms = void 0;
const Collection_1 = __importDefault(require("../../model/Collection"));
const Program_1 = __importDefault(require("../../model/Program"));
const FileUpload_1 = __importDefault(require("../../utils/FileUpload"));
const fs_1 = __importDefault(require("fs"));
const AllPrograms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const programs = yield Program_1.default.find().populate('pdfs videos');
    return result(res, 200, programs.map((program) => ({
        id: program._id,
        title: program.title,
        photo: program.photo,
        pdfs: program.pdfs.map((pdf) => ({
            id: pdf._id,
            title: pdf.title,
            link: pdf.link,
        })) || [],
        videos: program.videos.map((video) => ({
            id: video._id,
            title: video.title,
            link: video.link,
        })) || [],
    })));
});
exports.AllPrograms = AllPrograms;
const ProgramById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return result(res, 400, 'Program id is required');
    const program = yield Program_1.default.findById(id).populate('pdfs videos');
    if (!program)
        return result(res, 404, 'Program not found');
    return result(res, 200, {
        name: program.title,
        photo: program.photo,
        pdfs: program.pdfs.map((pdf) => ({
            id: pdf._id,
            title: pdf.title,
            link: pdf.link,
        })) || [],
        videos: program.videos.map((video) => ({
            id: video._id,
            title: video.title,
            link: video.link,
        })) || [],
    });
});
exports.ProgramById = ProgramById;
const CreateProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const program = new Program_1.default({
        title,
        photo: file,
    });
    try {
        yield program.save();
        return result(res, 200, 'Program created successfully');
    }
    catch (error) {
        return result(res, 500, 'Something went wrong');
    }
});
exports.CreateProgram = CreateProgram;
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
    const program = yield Program_1.default.findById(id);
    if (!program)
        return result(res, 404, 'Program not found');
    const collection = yield Collection_1.default.create({
        title,
        type: type,
        link: file || link,
    });
    if (collection.type === 'PDF') {
        program.pdfs.push(collection);
    }
    else {
        program.videos.push(collection);
    }
    try {
        yield program.save();
        return result(res, 200, 'Resource added successfully');
    }
    catch (error) {
        return result(res, 500, 'Something went wrong');
    }
});
exports.AddResources = AddResources;
const DeleteProgramByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return result(res, 400, 'Program id is required');
    const program = yield Program_1.default.findById(id);
    if (!program)
        return result(res, 404, 'Program not found');
    yield program.remove();
    return result(res, 200, 'Program deleted successfully');
});
exports.DeleteProgramByID = DeleteProgramByID;
const DeleteResourceByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, resourceID } = req.params;
    if (!id || !resourceID)
        return result(res, 400, 'Program id is required');
    const program = yield Program_1.default.findById(id);
    const resource = yield Collection_1.default.findById(resourceID);
    if (!program) {
        return result(res, 404, 'Program not found');
    }
    console.log(resourceID, program.videos);
    program.pdfs = program.pdfs.filter((pdf) => pdf._id.toString() !== resourceID);
    program.videos = program.videos.filter((video) => video._id.toString() !== resourceID);
    if (resource) {
        try {
            yield fs_1.default.unlinkSync(__basedir + '/static/uploads/' + resource.link);
        }
        catch (e) { }
        yield resource.remove();
    }
    yield program.save();
    return result(res, 200, 'Resource deleted successfully');
});
exports.DeleteResourceByID = DeleteResourceByID;
const result = (res, status, data) => {
    res.status(status).json(data);
};
//# sourceMappingURL=Program.js.map