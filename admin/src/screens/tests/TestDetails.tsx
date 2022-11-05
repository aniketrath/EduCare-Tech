import React from 'react';

import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import TextInput from '../../components/root/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {
	resetTestDetails,
	setTestTitle,
	addQuestion as addQuestionRedux,
	removeQuestion,
	updateQuestion,
	Question as IQuestion,
	setTestDetails,
	setTestTime,
} from '../../store/TestReducer';
import Button from '../../components/root/Button';
import { deleteTest, fetchTestDetails, saveQuestions } from '../../api/TestsHelper';
import Question from '../../components/module/Question';

export default function TestDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const state = useSelector((state: RootState) => state.test);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(resetTestDetails());
		if (!id) {
			return;
		}
		fetchTestDetails(id).then((res: any) => {
			dispatch(setTestDetails(res));
		});
	}, [id, dispatch]);

	if (!id) {
		return <Navigate to='/tests' />;
	}

	const saveQuestion = () => {
		saveQuestions(id, state).then((res) => {
			navigate('/home/tests/');
		});
	};

	const openResponses = () => {
		navigate(`/home/tests/${id}/responses`);
	};

	const deleteHandler = () => {
		deleteTest(id).then(() => {
			navigate('/home/tests/');
		});
	};

	return (
		<Box>
			<Box className='py-6 px-[4%] gap-3'>
				<Box className='center gap-3'>
					<Box>
						<Text className='text-xl font-bold capitalize'>Test Details</Text>
					</Box>
				</Box>
				<Box>
					<Text className='text-base font-medium capitalize text-dark'>Title</Text>
					<TextInput
						value={state.title}
						placeholder='Class 10: Aptitude Test'
						onChange={(text) => dispatch(setTestTitle(text))}
					/>
				</Box>

				<Box className='center'>
					<Box className='w-1/3'>
						<Text className='text-base font-medium capitalize text-dark'>Test Time (in mins)</Text>
						<TextInput
							value={state.time + ''}
							placeholder='60'
							onChange={(text) => dispatch(setTestTime(text))}
						/>
					</Box>
				</Box>
				<Box className='center'></Box>
			</Box>

			<Box className='py-6 px-[4%] gap-3'>
				<Box horizontal className='justify-between items-center'>
					<Box>
						<Text className='text-lg font-semibold capitalize'>Questions</Text>
					</Box>

					<Box horizontal className='w-1/2 gap-3'>
						<Box className='w-full'>
							<Button className='bg-red-500' onClick={deleteHandler}>
								Delete
							</Button>
						</Box>
						<Box className='w-full'>
							<Button className='bg-blue-500' onClick={openResponses}>
								Responses
							</Button>
						</Box>
						<Box className='w-full'>
							<Button onClick={saveQuestion}>Save</Button>
						</Box>
					</Box>
				</Box>
				<Box className='gap-3'>
					<Question
						{...({
							id: '',
							question: '',
							option1: '',
							option2: '',
							option3: '',
							option4: '',
							answer: '',
						} as IQuestion)}
						dummy
						onSave={(question) => dispatch(addQuestionRedux(question))}
						onUpdate={(question) => dispatch(updateQuestion(question))}
					/>
					{state.questions.map((question, index) => (
						<Question
							key={question.id}
							{...question}
							onSave={(question) => dispatch(addQuestionRedux(question))}
							onUpdate={(question) => dispatch(updateQuestion(question))}
							onDelete={(id) => dispatch(removeQuestion(id))}
						/>
					))}
				</Box>
			</Box>
		</Box>
	);
}
