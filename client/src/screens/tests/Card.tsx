import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { showResult } from '../../api/TestsHelper';
import Box from '../../components/root/Box';
import Button from '../../components/root/Button';
import Image from '../../components/root/Image';
import Text from '../../components/root/Text';

interface TestUpcoming {
	id: string;
	title: string;
	upcoming: true;
}

interface TestOnGoing {
	id: string;
	title: string;
	ongoing: true;
	completed: boolean;
}

interface TestPast {
	id: string;
	title: string;
	past: true;
	completed: boolean;
}

export default function Card(props: TestUpcoming | TestOnGoing | TestPast) {
	const navigate = useNavigate();
	const { title, id } = props;

	const onClick = () => {
		const isUpcoming = 'upcoming' in props;
		const isOnGoing = 'ongoing' in props;
		const isCompleted = 'completed' in props ? props.completed : false;
		const isPast = 'past' in props;

		if (isOnGoing) {
			if (isCompleted) {
				showResult(id);
			} else {
				navigate('/home/tests/terms-conditions/' + id);
			}
		} else if (isPast) {
			if (isCompleted) {
				showResult(id);
			}
		}
	};

	return (
		<Button
			onClick={onClick}
			className='!bg-transparent hover:!bg-primary-dark w-full center relative h-[65px] max-w-[350px] text-dark '
		>
			<Box horizontal className='w-full h-full bg-white my-1 px-2 items-center rounded-md gap-2'>
				<Box className='w-6  overflow-hidden drop-shadow-md'>
					<Box className={`w-6 h-6 rounded-full ${getColor(props)}`}></Box>
				</Box>

				<Box>
					<Text className='text-center text-dark'>{title}</Text>
				</Box>
			</Box>
		</Button>
	);
}
function getColor(props: TestUpcoming | TestOnGoing | TestPast) {
	const isUpcoming = 'upcoming' in props;
	const isOnGoing = 'ongoing' in props;
	const isCompleted = 'completed' in props ? props.completed : false;
	const isPast = 'past' in props;

	if (isPast) {
		if (isCompleted) {
			return 'bg-green-500';
		}
		return 'bg-red-500';
	} else if (isOnGoing) {
		if (isCompleted) {
			return 'bg-green-500';
		}
		return 'bg-yellow-500';
	} else {
		return 'bg-blue-500';
	}
}
