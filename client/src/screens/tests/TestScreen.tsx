import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import Countdown from 'react-countdown';
import Button from '../../components/root/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { resetTestDetails, setSelected, setSelectedOption } from '../../store/ExamReducer';
import Loading from '../../components/module/Loading';
import { getTest, submitTest } from '../../api/TestsHelper';
import { useCountdown } from '../../hooks/useCountdown';

export default function TestScreen() {
	const navigate = useNavigate();
	const { id } = useParams();

	const { questions, selected, time, resultID } = useSelector((state: RootState) => state.exam);
	const dispatch = useDispatch();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSelectedOption(e.target.value));
	};

	React.useEffect(() => {
		dispatch(resetTestDetails());
		if (!id) {
			return navigate('/');
		}
		getTest(id);
	}, [dispatch, navigate, id]);

	const submit = () => {
		if (!id) {
			return navigate('/');
		}
		submitTest(id, resultID, questions).then((res) => {
			navigate('/home/tests');
		});
	};

	if (questions.length === 0) {
		return <Loading />;
	}

	return (
		<Box className='min-h-screen bg-primary'>
			<Box horizontal className='py-6 px-[4%] justify-between'>
				<Box className='w-3/4'>
					<Box className='w-11/12 h-[40vh] bg-white p-3 rounded-lg overflow-x-hidden overflow-y-scroll'>
						<Text>{questions[selected].question}</Text>
					</Box>
					<Box className='gap-3 mt-[50px]'>
						<Box
							horizontal
							className='items-center gap-3 w-min min-w-[300px] bg-white p-3 rounded-lg'
						>
							<input
								onChange={handleChange}
								checked={questions[selected].answer === '1'}
								type='radio'
								value='1'
							/>
							<Text className='w-2/3'>{questions[selected].option1}</Text>
						</Box>
						<Box
							horizontal
							className='items-center gap-3 w-min min-w-[300px] bg-white p-3 rounded-lg'
						>
							<input
								onChange={handleChange}
								checked={questions[selected].answer === '2'}
								type='radio'
								value='2'
							/>
							<Text className='w-2/3'>{questions[selected].option2}</Text>
						</Box>
						<Box
							horizontal
							className='items-center gap-3 w-min min-w-[300px] bg-white p-3 rounded-lg'
						>
							<input
								onChange={handleChange}
								checked={questions[selected].answer === '3'}
								type='radio'
								value='3'
							/>
							<Text className='w-2/3'>{questions[selected].option3}</Text>
						</Box>
						<Box
							horizontal
							className='items-center gap-3 w-min min-w-[300px] bg-white p-3 rounded-lg'
						>
							<input
								onChange={handleChange}
								checked={questions[selected].answer === '4'}
								type='radio'
								value='4'
							/>
							<Text className='w-2/3'>{questions[selected].option4}</Text>
						</Box>
					</Box>
				</Box>
				<Box className='w-1/4'>
					<Timer onSubmit={submit} time={time} />

					<Button
						onClick={submit}
						className='!bg-green-500 mt-3 w-full center relative  text-light font-medium '
					>
						Submit
					</Button>

					<Box className='mt-[50px]  py-[10px] bg-white rounded-lg '>
						<Box>
							<Text className='text-center text-dark text-lg font-semibold'>Index</Text>
						</Box>
						<Box className='max-h-[40vh] py-3 mt-3 grid grid-cols-4 gap-y-3 overflow-y-scroll overflow-x-hidden border'>
							{questions.map((_, index) => (
								<QuestionSelector
									key={index}
									index={index + 1}
									selected={selected === index}
									onClick={() => {
										dispatch(setSelected(index));
									}}
								/>
							))}
						</Box>

						<Box className='mt-[10px]'>
							<Text className='text-dark text-center'>Total Questions : {questions.length}</Text>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

type QuestionSelectorProps = {
	index: number;
	onClick: () => void;
	selected: boolean;
};

function QuestionSelector({ index, selected, onClick }: QuestionSelectorProps) {
	return (
		<Button onClick={onClick} className='!bg-transparent px-0 py-0 w-full center'>
			<Box
				className={`w-[50px] aspect-square rounded-full border-2 border-dark center ${
					selected ? 'bg-blue-500 text-light' : 'bg-white  text-dark'
				}`}
			>
				<Text className='text-center'>{index}</Text>
			</Box>
		</Button>
	);
}

function Timer({ onSubmit, time }: { onSubmit: () => void; time: number }) {
	const startTime = useSelector((state: RootState) => state.exam.startTime);

	const { minutes, seconds, completed } = useCountdown(startTime + time);

	let _minutes = minutes + '';
	let _seconds = seconds + '';

	if (minutes < 10) {
		_minutes = '0' + minutes;
	}
	if (seconds < 10) {
		_seconds = '0' + seconds;
	}
	if (completed) {
		onSubmit();
	}
	return (
		<Box className='px-6 py-2 rounded-md bg-dark'>
			<Text className='font-semibold text-lg text-center text-light'>
				{_minutes}:{_seconds}
			</Text>
		</Box>
	);
}
