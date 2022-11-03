"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ResultSchema = new mongoose_1.default.Schema({
    test: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Test',
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    score: {
        type: Number,
    },
    submitted: {
        type: Boolean,
        default: false,
    },
    startedAt: {
        type: String,
    },
}, { timestamps: true });
const Result = mongoose_1.default.model('Result', ResultSchema);
exports.default = Result;
//# sourceMappingURL=Result.js.map