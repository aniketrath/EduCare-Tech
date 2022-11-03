import React from 'react';

import { useNavigate } from 'react-router-dom';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import TextInput from '../../components/root/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {
	resetTestDetails,
	setTestEndDate,
	setTestStartDate,
	setTestTime,
	setTestTitle,
} from '../../store/TestReducer';
import Button from '../../components/root/Button';
import { createTest } from '../../api/TestsHelper';

export default function NewTest() {
	const navigate = useNavigate();
	const state = useSelector((state: RootState) => state.test);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(resetTestDetails());
	}, [dispatch]);

	const createTestHandler = () => {
		createTest(state).then((res: any) => {
			navigate('/home/tests/details/' + res.testID);
		});
	};

	return (
		<Box>
			<Box className='py-6 px-[4%] gap-3'>
				<Box className='center gap-3'>
					<Box>
						<Text className='text-xl font-bold capitalize'>Schedule Test</Text>
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

				<Box horizontal className='justify-around'>
					<Box className='w-1/3'>
						<Text className='text-base font-medium capitalize text-dark'>Test Start Date</Text>
						<TextInput
							value={state.startDate}
							placeholder='dd/mm/yyyy'
							onChange={(text) => dispatch(setTestStartDate(text))}
						/>
					</Box>
					<Box className='w-1/3'>
						<Text className='text-base font-medium capitalize text-dark'>Test End Date</Text>
						<TextInput
							value={state.endDate}
							placeholder='dd/mm/yyyy'
							onChange={(text) => dispatch(setTestEndDate(text))}
						/>
					</Box>
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
				<Box className='center'>
					<Box className='w-1/3'>
						<Button onClick={createTestHandler}>Add Questions</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
