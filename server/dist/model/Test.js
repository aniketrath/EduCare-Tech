"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TestSchema = new mongoose_1.default.Schema({
    title: { type: String },
    questions: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Question',
        },
    ],
    time: { type: Number },
}, { timestamps: true });
const Test = mongoose_1.default.model('Test', TestSchema);
exports.default = Test;
//# sourceMappingURL=Test.js.map