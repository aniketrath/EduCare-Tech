import { Request, Response } from 'express';
import Test from '../../model/Test';
// import moment from 'moment';
import Result from '../../model/Result';
import ITest from '../../types/Test';
import IQuestion from '../../types/Question';
import Question from '../../model/Question';

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

export const CreateTest = async (req: Request, res: Response) => {
	const { title, time } = req.body;

	const test = new Test({
		title,
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
	const { title, questions, time } = req.body;

	const test = await Test.findById(testID);
	if (!test) return result(res, 404, 'Test not found');

	const _questions = await Question.find({ _id: { $in: questions.map((q) => q.id) } });

	test.title = title;
	test.questions = _questions;
	test.time = time * 60 * 1000;

	test.save();

	return result(res, 200, 'Test updated successfully');
};

const result = (res: Response, status: number, data: string | number | object) => {
	res.status(status).json(data);
};
