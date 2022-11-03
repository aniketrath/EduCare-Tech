import { Request, Response } from 'express';
import Test from '../../model/Test';
import moment from 'moment';
import Result from '../../model/Result';
import ITest from '../../types/Test';
import IQuestion from '../../types/Question';
import Question from '../../model/Question';

export const AllTests = async (req: Request, res: Response) => {
	const startsAt = moment();
	startsAt.subtract(3, 'month');
	const endsAt = moment();
	endsAt.add(3, 'month');

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
		isCompleted: results.some((result) => result.test?.toString() === test._id.toString()),
	}));

	const past = _past.map((test) => ({
		id: test._id,
		title: test.title,
		isCompleted: results.some((result) => result.test?.toString() === test._id.toString()),
	}));

	return result(res, 200, {
		past,
		upcoming,
		ongoing,
	});
};

export const CreateTest = async (req: Request, res: Response) => {
	const { title, startDate, endDate, time } = req.body;

	const momentStartsAt = moment(startDate, 'DD-MM-YYYY');
	const momentEndsAt = moment(endDate, 'DD-MM-YYYY');

	if (!momentStartsAt.isValid() || !momentEndsAt.isValid()) {
		return result(res, 400, 'Invalid date format');
	} else if (momentStartsAt.isAfter(momentEndsAt)) {
		return result(res, 400, 'Start date cannot be after end date');
	} else if (momentStartsAt.isBefore(moment())) {
		return result(res, 400, 'Start date cannot be before today');
	} else if (momentEndsAt.isBefore(moment())) {
		return result(res, 400, 'End date cannot be before today');
	} else if (momentEndsAt.isSame(momentStartsAt)) {
		return result(res, 400, 'Start date and end date cannot be the same');
	}

	const test = new Test({
		title,
		startsAt: momentStartsAt.toDate(),
		endsAt: momentEndsAt.toDate(),
		time: time * 60 * 1000,
	});

	try {
		await test.save();
		return result(res, 200, {
			message: 'Test created successfully',
			testID: test._id,
		});
	} catch (err) {
		return result(res, 500, 'Unable to create test');
	}
};

export const TestDetails = async (req: Request, res: Response) => {
	const id = req.params.testID;
	if (!id) return result(res, 400, 'Invalid test ID');

	const test = await Test.findById(id).populate('questions');
	if (!test) return result(res, 404, 'Test not found');

	return result(res, 200, {
		title: test.title,
		startDate: moment(test.startsAt).format('DD/MM/YYYY'),
		endDate: moment(test.endsAt).format('DD/MM/YYYY'),
		time: test.time / (60 * 1000),
		questions: test.questions.map((question) => ({
			id: question._id,
			question: question.question,
			option1: question.option1,
			option2: question.option2,
			option3: question.option3,
			option4: question.option4,
			answer: question.answer,
		})),
	});
};

export const TestResponses = async (req: Request, res: Response) => {
	const id = req.params.testID;
	if (!id) return result(res, 400, 'Invalid test ID');

	const test = await Test.findById(id).populate('questions');
	if (!test) return result(res, 404, 'Test not found');

	const results = await Result.find({ test }).populate('user');

	const _results = results.map((result) => ({
		name: result.user.name,
		email: result.user.email,
		marks: result.score,
	}));
	return result(res, 200, _results);
};

export const SaveQuestion = async (req: Request, res: Response) => {
	const { id, question, option1, option2, option3, option4, answer } = req.body;

	let _question: IQuestion | null = null;
	let updated = false;
	if (!id) {
		_question = new Question();
	} else {
		_question = await Question.findById(id);
		if (!_question) return result(res, 404, 'Question not found');
		updated = true;
	}

	_question.question = question;
	_question.option1 = option1;
	_question.option2 = option2;
	_question.option3 = option3;
	_question.option4 = option4;
	_question.answer = answer;

	_question.save();

	return result(res, 200, {
		message: 'Question saved successfully',
		id: _question._id,
		question: _question.question,
		option1: _question.option1,
		option2: _question.option2,
		option3: _question.option3,
		option4: _question.option4,
		answer: _question.answer,
		updated,
	});
};

export const DeleteQuestion = async (req: Request, res: Response) => {
	const { id } = req.body;

	const question = await Question.findById(id);
	if (!question) return result(res, 404, 'Question not found');

	question.remove();

	return result(res, 200, 'Question deleted successfully');
};

export const UpdateTest = async (req: Request, res: Response) => {
	const { testID } = req.params;
	const { title, startDate, endDate, questions, time } = req.body;

	const momentStartsAt = moment(startDate, 'DD-MM-YYYY');
	const momentEndsAt = moment(endDate, 'DD-MM-YYYY');

	if (!momentStartsAt.isValid() || !momentEndsAt.isValid()) {
		return result(res, 400, 'Invalid date format');
	} else if (momentStartsAt.isAfter(momentEndsAt)) {
		return result(res, 400, 'Start date cannot be after end date');
	} else if (momentStartsAt.isBefore(moment())) {
		return result(res, 400, 'Start date cannot be before today');
	} else if (momentEndsAt.isBefore(moment())) {
		return result(res, 400, 'End date cannot be before today');
	} else if (momentEndsAt.isSame(momentStartsAt)) {
		return result(res, 400, 'Start date and end date cannot be the same');
	}

	const test = await Test.findById(testID);
	if (!test) return result(res, 404, 'Test not found');

	const _questions = await Question.find({ _id: { $in: questions.map((q) => q.id) } });

	test.title = title;
	test.startsAt = momentStartsAt.toDate();
	test.endsAt = momentEndsAt.toDate();
	test.questions = _questions;
	test.time = time * 60 * 1000;

	test.save();

	return result(res, 200, 'Test updated successfully');
};

const result = (res: Response, status: number, data: string | number | object) => {
	res.status(status).json(data);
};
