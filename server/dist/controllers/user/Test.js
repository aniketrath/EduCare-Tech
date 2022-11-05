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
exports.SubmitTest = exports.TestByID = exports.AllTests = void 0;
const Test_1 = __importDefault(require("../../model/Test"));
const moment_1 = __importDefault(require("moment"));
const Result_1 = __importDefault(require("../../model/Result"));
const AllTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tests = yield Test_1.default.find().sort({ createdAt: 1 });
    return result(res, 200, tests.map((test) => ({
        id: test._id,
        title: test.title,
    })));
});
exports.AllTests = AllTests;
const TestByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testID } = req.params;
    const test = yield Test_1.default.findById(testID).populate('questions');
    if (!test)
        return result(res, 404, 'Test not found');
    const questions = test.questions.map((question) => ({
        id: question._id,
        question: question.question,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
    }));
    const _result = yield Result_1.default.create({
        user: req.user._id,
        test,
        startedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
    });
    return result(res, 200, {
        time: test.time,
        questions,
        resultID: _result._id,
    });
});
exports.TestByID = TestByID;
const SubmitTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testID } = req.params;
    const { questions, resultID } = req.body;
    const test = yield Test_1.default.findById(testID).populate('questions');
    if (!test)
        return result(res, 404, 'Test not found');
    const _result = yield Result_1.default.findById(resultID);
    if (!_result)
        return result(res, 400, 'Test not found');
    if (_result.submitted)
        return result(res, 400, 'Test already completed');
    const correctAnswers = {};
    test.questions.forEach((question) => {
        correctAnswers[question._id] = question.answer;
    });
    let score = 0;
    questions.forEach((question) => {
        if (correctAnswers[question.id] === question.answer)
            score++;
    });
    const createdAt = (0, moment_1.default)(_result.startedAt);
    createdAt.add(test.time + 5, 'minutes');
    if ((0, moment_1.default)().isAfter(createdAt))
        return result(res, 400, 'Test cannot be submitted. Time is up.');
    _result.submitted = true;
    _result.score = score;
    yield _result.save();
    return result(res, 200, {
        message: 'Test submitted successfully',
        score,
        total: test.questions.length,
    });
});
exports.SubmitTest = SubmitTest;
// export const ResultTest = async (req: Request, res: Response) => {
// 	const { testID } = req.params;
// 	if (!testID) {
// 		return result(res, 400, 'Invalid Test ID');
// 	}
// 	const test = await Test.findById(testID).populate('questions');
// 	if (!test) return result(res, 404, 'Test not found');
// 	const _result = await Result.findOne({
// 		$and: [{ user: req.user._id }, { test: testID }],
// 	});
// 	if (!_result) return result(res, 400, 'Test not found');
// 	if (!_result.submitted) return result(res, 400, 'Test not completed');
// 	return result(res, 200, {
// 		score: _result.score,
// 		total: test.questions.length,
// 	});
// };
const result = (res, status, data) => {
    res.status(status).json(data);
};
//# sourceMappingURL=Test.js.map