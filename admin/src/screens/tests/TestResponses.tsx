import React from 'react';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import { useParams } from 'react-router-dom';
import { getTestResponses } from '../../api/TestsHelper';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../store/UtilsReducer';

type Result = {
	name: string;
	email: string;
	marks: number;
};

export default function TestResponses() {
	const { id } = useParams();
	const [data, setData] = React.useState<Result[]>([]);
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!id) return;
		getTestResponses(id)
			.then((res: any) => {
				setData(res);
			})
			.catch((err) => {
				dispatch(showAlert("Couldn't fetch responses"));
			});
	}, [id, dispatch]);

	return (
		<Box>
			<Box className='py-6 px-[4%] gap-3'>
				<Box className='center gap-3'>
					<Box>
						<Text className='text-xl font-bold capitalize'>Test Responses</Text>
					</Box>
				</Box>
			</Box>

			<Box className='text-dark '>
				<Box className='py-6 px-[4%] border-dark'>
					<Box
						horizontal
						className='w-full grid grid-cols-3 bg-dark text-light text-xl font-semibold rounded-t-lg overflow-hidden py-2'
					>
						<Box className='center'>
							<Text>Name</Text>
						</Box>
						<Box className='center'>
							<Text>Email</Text>
						</Box>
						<Box className='center'>
							<Text>Marks Scored</Text>
						</Box>
					</Box>
					<Box className='border-b border-dark'>
						{data.map((item, index) => (
							<Row key={index} {...item} />
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

function Row({ name, email, marks }: Result) {
	return (
		<Box
			horizontal
			className='w-full grid grid-cols-3 bg-primary even:bg-primary-dark text-dark border-x border-x-dark'
		>
			<Box className='border-r border-r-dark px-3'>
				<Text>{name}</Text>
			</Box>
			<Box className='border-r border-r-dark px-3'>
				<Text>{email}</Text>
			</Box>
			<Box className='center'>
				<Text>{marks}</Text>
			</Box>
		</Box>
	);
}
