import React from 'react';
import { useSelector } from 'react-redux';
import { getTests } from '../../api/TestsHelper';
import Box from '../../components/root/Box';
import Button from '../../components/root/Button';
import Text from '../../components/root/Text';
import { RootState } from '../../store/store';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

export default function Tests() {
	const navigate = useNavigate();
	const tests = useSelector((state: RootState) => state.test.tests);

	React.useEffect(() => {
		getTests();
	}, []);

	const scheduleTest = () => {
		// navigate('/home/tests/details/63614c7f069d2106f050d4c1');
		navigate('/home/tests/new');
	};

	return (
		<Box>
			<Box className='py-6 px-[4%]'>
				<Box className='center gap-3'>
					<Box className='px-[5%] center'>
						<Box horizontal className='gap-3'>
							<Box className={`w-6 h-6 rounded-full bg-blue-500`}></Box>
							<Text className='text-dark font-semibold'>Available</Text>
						</Box>
					</Box>
					<Box className='w-full center'>
						<Box className='w-1/2'>
							<Button onClick={scheduleTest} className='center'>
								<Text className='text-white font-medium text-center w-full'>Schedule Test</Text>
							</Button>
						</Box>
					</Box>
				</Box>
				<Box horizontal className='mt-12 items-center justify-between'>
					<Text className='text-xl font-medium capitalize'>Available Tests</Text>
				</Box>

				<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
					{tests.map((test, index) => (
						<Card key={index} title={test.title} id={test.id} upcoming />
					))}
				</Box>
			</Box>
		</Box>
	);
}
