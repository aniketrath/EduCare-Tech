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
exports.DeleteProgramByID = exports.AddResources = exports.CreateProgram = exports.ProgramById = exports.AllPrograms = void 0;
const Collection_1 = __importDefault(require("../../model/Collection"));
const Program_1 = __importDefault(require("../../model/Program"));
const FileUpload_1 = __importDefault(require("../../utils/FileUpload"));
const AllPrograms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const programs = yield Program_1.default.find();
    return result(res, 200, programs.map((program) => ({
        id: program._id,
        title: program.title,
        photo: program.photo,
        pdfs: program.pdfs || [],
        videos: program.videos || [],
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
        pdfs: program.pdfs,
        videos: program.videos,
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
    yield Program_1.default.findByIdAndDelete(id);
});
exports.DeleteProgramByID = DeleteProgramByID;
const result = (res, status, data) => {
    res.status(status).json(data);
};
//# sourceMappingURL=Program.js.map