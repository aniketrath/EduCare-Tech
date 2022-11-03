"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QuestionSchema = new mongoose_1.default.Schema({
    question: { type: String },
    option1: { type: String },
    option2: { type: String },
    option3: { type: String },
    option4: { type: String },
    answer: {
        type: String,
        enum: ['1', '2', '3', '4'],
    },
}, { timestamps: true });
const Question = mongoose_1.default.model('Question', QuestionSchema);
exports.default = Question;
//# sourceMappingURL=Question.js.map