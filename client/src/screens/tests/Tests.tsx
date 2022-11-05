import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTests } from '../../api/TestsHelper';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import TextInput from '../../components/root/TextInput';
import { RootState } from '../../store/store';
import { setSearchQuery } from '../../store/TestReducer';
import Card from './Card';

export default function Tests() {
	const { tests, query } = useSelector((state: RootState) => state.test);
	const dispatch = useDispatch();

	React.useEffect(() => {
		getTests();
	}, []);

	return (
		<Box>
			<Box className='py-6 px-[4%]'>
				<Box className='center py-2'>
					<TextInput
						className='w-[500px]'
						placeholder='Class-Subject-Chapter'
						value={query}
						onChange={(text) => dispatch(setSearchQuery(text))}
					/>
				</Box>
				<Box horizontal className=' items-center justify-between'>
					<Text className='text-xl font-medium capitalize'>Available Tests</Text>
				</Box>

				<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
					{tests.map((test, index) => {
						if (test.title.toLowerCase().includes(query.toLowerCase())) {
							return <Card key={index} title={test.title} id={test.id} upcoming />;
						} else {
							return null;
						}
					})}
				</Box>
			</Box>
		</Box>
	);
}
