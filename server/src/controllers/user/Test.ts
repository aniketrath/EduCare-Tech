import { Request, Response } from 'express';
import Test from '../../model/Test';
import moment from 'moment';
import Result from '../../model/Result';

export const AllTests = async (req: Request, res: Response) => {
	const startsAt = moment();
	startsAt.subtract(1, 'month');
	const endsAt = moment();
	endsAt.add(1, 'month');

	const tests = await Test.find({
		startsAt: { $gte: startsAt.toDate() },
	}).sort({ createdAt: 1 });

	const _upcoming = tests.filter((test) => moment(test.startsAt).isAfter(moment()));
	let _ongoing = tests.filter(
		(test) => moment(test.startsAt).isBefore(moment()) && moment(test.endsAt).isAfter(moment())
	);
	let _past = tests.filter((test) => moment(test.endsAt).isBefore(moment()));

	const results = await Result.find({
		$and: [{ user: req.user._id }, { test: { $in: tests.map((test) => test._id) } }],
	});

	const upcoming = _upcoming.map((test) => ({
		id: test._id,
		title: test.title,
		isCompleted: false,
	}));

	const ongoing = _ongoing.map((test) => ({
		id: test._id,
		title: test.title,
		isCompleted: results.find((result) => result.test?.toString() === test._id.toString())
			?.submitted,
	}));

	const past = _past.map((test) => ({
		id: test._id,
		title: test.title,
		isCompleted: results.find((result) => result.test?.toString() === test._id.toString())
			?.submitted,
	}));

	return result(res, 200, {
		past,
		upcoming,
		ongoing,
	});
};

export const TestByID = async (req: Request, res: Response) => {
	const { testID } = req.params;

	const test = await Test.findById(testID).populate('questions');
	if (!test) return result(res, 404, 'Test not found');

	if (moment(test.startsAt).isAfter(moment())) return result(res, 400, 'Test has not started yet');
	else if (moment(test.endsAt).isBefore(moment())) return result(res, 400, 'Test has ended');
	else if (moment(test.startsAt).isBefore(moment()) && moment(test.endsAt).isAfter(moment())) {
		const _result = await Result.findOne({
			$and: [{ user: req.user._id }, { test: testID }],
		});
		if (_result?.submitted) return result(res, 400, 'Test already completed');
	}

	const questions = test.questions.map((question) => ({
		id: question._id,
		question: question.question,
		option1: question.option1,
		option2: question.option2,
		option3: question.option3,
		option4: question.option4,
	}));

	await Result.create({
		user: req.user._id,
		test,
		startedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
	});

	return result(res, 200, {
		time: test.time,
		questions,
	});
};

export const SubmitTest = async (req: Request, res: Response) => {
	const { testID } = req.params;
	const { questions } = req.body;

	const test = await Test.findById(testID).populate('questions');
	if (!test) return result(res, 404, 'Test not found');

	if (moment(test.startsAt).isAfter(moment())) return result(res, 400, 'Test has not started yet');
	else if (moment(test.endsAt).isBefore(moment())) return result(res, 400, 'Test has ended');

	const _result = await Result.findOne({
		$and: [{ user: req.user._id }, { test: testID }],
	});

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
	createdAt.add(1, 'hour');
	createdAt.add(5, 'minutes');

	if (moment().isAfter(createdAt)) return result(res, 400, 'Test already completed');
	_result.submitted = true;
	_result.score = score;
	await _result.save();

	return result(res, 200, 'Test submitted successfully');
};

export const ResultTest = async (req: Request, res: Response) => {
	const { testID } = req.params;
	if (!testID) {
		return result(res, 400, 'Invalid Test ID');
	}

	const test = await Test.findById(testID).populate('questions');
	if (!test) return result(res, 404, 'Test not found');

	const _result = await Result.findOne({
		$and: [{ user: req.user._id }, { test: testID }],
	});

	if (!_result) return result(res, 400, 'Test not found');

	if (!_result.submitted) return result(res, 400, 'Test not completed');

	return result(res, 200, {
		score: _result.score,
		total: test.questions.length,
	});
};

const result = (res: Response, status: number, data: string | number | object) => {
	res.status(status).json(data);
};
