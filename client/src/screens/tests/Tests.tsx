import React from 'react';
import { useSelector } from 'react-redux';
import { getTests } from '../../api/TestsHelper';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import { RootState } from '../../store/store';
import Card from './Card';

export default function Tests() {
	const tests = useSelector((state: RootState) => state.test);

	React.useEffect(() => {
		getTests();
	}, []);

	const { upcoming, ongoing, past } = tests;

	return (
		<Box>
			<Box className='py-6 px-[4%]'>
				<Box className='center py-6'>
					<Box className='px-[5%] grid grid-cols-2 md:grid-cols-4 gap-6'>
						<Box horizontal className='gap-3'>
							<Box className={`w-6 h-6 rounded-full bg-red-500`}></Box>
							<Text className='text-dark font-semibold'>Missed</Text>
						</Box>
						<Box horizontal className='gap-3'>
							<Box className={`w-6 h-6 rounded-full bg-yellow-500`}></Box>
							<Text className='text-dark font-semibold'>OnGoing</Text>
						</Box>
						<Box horizontal className='gap-3'>
							<Box className={`w-6 h-6 rounded-full bg-green-500`}></Box>
							<Text className='text-dark font-semibold'>Completed</Text>
						</Box>
						<Box horizontal className='gap-3'>
							<Box className={`w-6 h-6 rounded-full bg-blue-500`}></Box>
							<Text className='text-dark font-semibold'>Upcoming</Text>
						</Box>
					</Box>
				</Box>
				{ongoing.length > 0 && (
					<>
						<Box horizontal className='mt-12 items-center justify-between'>
							<Text className='text-xl font-medium capitalize'>On-Going Tests</Text>
						</Box>

						<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
							{ongoing.map((test, index) => (
								<Card
									key={index}
									title={test.title}
									id={test.id}
									ongoing
									completed={test.isCompleted}
								/>
							))}
						</Box>
					</>
				)}
				{upcoming.length > 0 && (
					<>
						<Box horizontal className='items-center justify-between'>
							<Text className='text-xl font-medium capitalize'>Upcoming Tests</Text>
						</Box>

						<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
							{upcoming.map((test, index) => (
								<Card key={index} title={test.title} id={test.id} upcoming completed={false} />
							))}
						</Box>
					</>
				)}
				{past.length > 0 && (
					<>
						<Box horizontal className='items-center justify-between'>
							<Text className='text-xl font-medium capitalize'>Past Tests</Text>
						</Box>

						<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
							{past.map((test, index) => (
								<Card
									key={index}
									title={test.title}
									id={test.id}
									past
									completed={test.isCompleted}
								/>
							))}
						</Box>
					</>
				)}
			</Box>
		</Box>
	);
}
