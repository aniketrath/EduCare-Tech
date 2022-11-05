import { Request, Response } from 'express';
import Test from '../../model/Test';
import moment from 'moment';
import Result from '../../model/Result';
import IQuestion from '../../types/Question';

export const AllTests = async (req: Request, res: Response) => {
	const tests = await Test.find().sort({ createdAt: 1 });

	return result(
		res,
		200,
		tests.map((test) => ({
			id: test._id,
			title: test.title,
		}))
	);
};

export const TestByID = async (req: Request, res: Response) => {
	const { testID } = req.params;

	const test = await Test.findById(testID).populate('questions');
	if (!test) return result(res, 404, 'Test not found');

	const questions = test.questions.map((question) => ({
		id: question._id,
		question: question.question,
		option1: question.option1,
		option2: question.option2,
		option3: question.option3,
		option4: question.option4,
	}));

	const _result = await Result.create({
		user: req.user._id,
		test,
		startedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
	});

	return result(res, 200, {
		time: test.time,
		questions,
		resultID: _result._id,
	});
};

export const SubmitTest = async (req: Request, res: Response) => {
	const { testID } = req.params;
	const { questions, resultID } = req.body;

	const test = await Test.findById(testID).populate('questions');
	if (!test) return result(res, 404, 'Test not found');

	const _result = await Result.findById(resultID);

	if (!_result) return result(res, 400, 'Test not found');

	if (_result.submitted) return result(res, 400, 'Test already completed');

	const correctAnswers = {};
	test.questions.forEach((question) => {
		correctAnswers[question._id] = question.answer;
	});

	let score = 0;
	questions.forEach((question) => {
		if (correctAnswers[question.id] === question.answer) score++;
	});

	const createdAt = moment(_result.startedAt);
	createdAt.add(test.time + 5, 'minutes');

	if (moment().isAfter(createdAt)) return result(res, 400, 'Test cannot be submitted. Time is up.');
	_result.submitted = true;
	_result.score = score;
	await _result.save();

	return result(res, 200, {
		message: 'Test submitted successfully',
		score,
		total: test.questions.length,
	});
};

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

const result = (res: Response, status: number, data: string | number | object) => {
	res.status(status).json(data);
};
