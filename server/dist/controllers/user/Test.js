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
exports.ResultTest = exports.SubmitTest = exports.TestByID = exports.AllTests = void 0;
const Test_1 = __importDefault(require("../../model/Test"));
const moment_1 = __importDefault(require("moment"));
const Result_1 = __importDefault(require("../../model/Result"));
const AllTests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const startsAt = (0, moment_1.default)();
    startsAt.subtract(1, 'month');
    const endsAt = (0, moment_1.default)();
    endsAt.add(1, 'month');
    const tests = yield Test_1.default.find({
        startsAt: { $gte: startsAt.toDate() },
    }).sort({ createdAt: 1 });
    const _upcoming = tests.filter((test) => (0, moment_1.default)(test.startsAt).isAfter((0, moment_1.default)()));
    let _ongoing = tests.filter((test) => (0, moment_1.default)(test.startsAt).isBefore((0, moment_1.default)()) && (0, moment_1.default)(test.endsAt).isAfter((0, moment_1.default)()));
    let _past = tests.filter((test) => (0, moment_1.default)(test.endsAt).isBefore((0, moment_1.default)()));
    const results = yield Result_1.default.find({
        $and: [{ user: req.user._id }, { test: { $in: tests.map((test) => test._id) } }],
    });
    const upcoming = _upcoming.map((test) => ({
        id: test._id,
        title: test.title,
        isCompleted: false,
    }));
    const ongoing = _ongoing.map((test) => {
        var _a;
        return ({
            id: test._id,
            title: test.title,
            isCompleted: (_a = results.find((result) => { var _a; return ((_a = result.test) === null || _a === void 0 ? void 0 : _a.toString()) === test._id.toString(); })) === null || _a === void 0 ? void 0 : _a.submitted,
        });
    });
    const past = _past.map((test) => {
        var _a;
        return ({
            id: test._id,
            title: test.title,
            isCompleted: (_a = results.find((result) => { var _a; return ((_a = result.test) === null || _a === void 0 ? void 0 : _a.toString()) === test._id.toString(); })) === null || _a === void 0 ? void 0 : _a.submitted,
        });
    });
    return result(res, 200, {
        past,
        upcoming,
        ongoing,
    });
});
exports.AllTests = AllTests;
const TestByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testID } = req.params;
    const test = yield Test_1.default.findById(testID).populate('questions');
    if (!test)
        return result(res, 404, 'Test not found');
    if ((0, moment_1.default)(test.startsAt).isAfter((0, moment_1.default)()))
        return result(res, 400, 'Test has not started yet');
    else if ((0, moment_1.default)(test.endsAt).isBefore((0, moment_1.default)()))
        return result(res, 400, 'Test has ended');
    else if ((0, moment_1.default)(test.startsAt).isBefore((0, moment_1.default)()) && (0, moment_1.default)(test.endsAt).isAfter((0, moment_1.default)())) {
        const _result = yield Result_1.default.findOne({
            $and: [{ user: req.user._id }, { test: testID }],
        });
        if (_result === null || _result === void 0 ? void 0 : _result.submitted)
            return result(res, 400, 'Test already completed');
    }
    const questions = test.questions.map((question) => ({
        id: question._id,
        question: question.question,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
    }));
    yield Result_1.default.create({
        user: req.user._id,
        test,
        startedAt: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
    });
    return result(res, 200, {
        time: test.time,
        questions,
    });
});
exports.TestByID = TestByID;
const SubmitTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testID } = req.params;
    const { questions } = req.body;
    const test = yield Test_1.default.findById(testID).populate('questions');
    if (!test)
        return result(res, 404, 'Test not found');
    if ((0, moment_1.default)(test.startsAt).isAfter((0, moment_1.default)()))
        return result(res, 400, 'Test has not started yet');
    else if ((0, moment_1.default)(test.endsAt).isBefore((0, moment_1.default)()))
        return result(res, 400, 'Test has ended');
    const _result = yield Result_1.default.findOne({
        $and: [{ user: req.user._id }, { test: testID }],
    });
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
    createdAt.add(1, 'hour');
    createdAt.add(5, 'minutes');
    if ((0, moment_1.default)().isAfter(createdAt))
        return result(res, 400, 'Test already completed');
    _result.submitted = true;
    _result.score = score;
    yield _result.save();
    return result(res, 200, 'Test submitted successfully');
});
exports.SubmitTest = SubmitTest;
const ResultTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testID } = req.params;
    if (!testID) {
        return result(res, 400, 'Invalid Test ID');
    }
    const test = yield Test_1.default.findById(testID).populate('questions');
    if (!test)
        return result(res, 404, 'Test not found');
    const _result = yield Result_1.default.findOne({
        $and: [{ user: req.user._id }, { test: testID }],
    });
    if (!_result)
        return result(res, 400, 'Test not found');
    if (!_result.submitted)
        return result(res, 400, 'Test not completed');
    return result(res, 200, {
        score: _result.score,
        total: test.questions.length,
    });
});
exports.ResultTest = ResultTest;
const result = (res, status, data) => {
    res.status(status).json(data);
};
//# sourceMappingURL=Test.js.map