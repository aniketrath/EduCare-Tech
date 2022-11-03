import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../utils/Consts';
import Box from '../root/Box';
import Button from '../root/Button';
import Image from '../root/Image';
import Text from '../root/Text';

interface CardProps {
	id: string;
	title: string;
	photo: string;
}

export default function ProgramCard({ id, title, photo }: CardProps) {
	const navigate = useNavigate();
	return (
		<Button
			onClick={() => navigate('/home/programs/' + id)}
			className='!bg-transparent hover:!bg-primary-dark w-full center relative h-[150px] text-dark '
		>
			<Box className=' w-[100px] h-[100px] aspect-square overflow-hidden rounded-full z-10 drop-shadow-md border border-primary/80'>
				<Image src={SERVER_URL + 'image/' + photo} />
			</Box>
			<Box className='absolute bottom-1 w-3/5 py-1 bg-white rounded-md '>
				<Text className='text-center text-dark'>{title}</Text>
			</Box>
		</Button>
	);
}
