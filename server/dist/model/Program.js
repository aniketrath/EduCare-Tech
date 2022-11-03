"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProgramSchema = new mongoose_1.default.Schema({
    title: { type: String },
    photo: { type: String },
    pdfs: [{ type: Object }],
    videos: [{ type: Object }],
}, { timestamps: true });
const Program = mongoose_1.default.model('Program', ProgramSchema);
exports.default = Program;
//# sourceMappingURL=Program.js.map