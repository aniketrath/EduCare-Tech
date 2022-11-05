import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServerURL } from '../../api/Axios';
import { BRAIN, GOOGLE } from '../../assets/Images';
import Box from '../root/Box';
import Button from '../root/Button';
import Image from '../root/Image';
import Text from '../root/Text';

interface CardProps {
	id: string;
	title: string;
	photo: string;
}

export default function SkillCard({ id, title, photo }: CardProps) {
	const navigate = useNavigate();
	return (
		<Button
			onClick={() => navigate('/home/skills/' + id)}
			className='!bg-transparent hover:!bg-primary-dark w-full justify-items-end relative h-[150px] text-dark '
		>
			<Box className='w-full h-4/5 rounded-md py-1 bg-white justify-end center'>
				<Box className='absolute -top-2 w-[100px] h-[100px] aspect-square  overflow-hidden rounded-full z-10 drop-shadow-md  border border-primary/80'>
					<Image src={ServerURL + 'image/' + photo} />
				</Box>
				<Box className=' w-full py-1  bg-white rounded-md '>
					<Text className='text-center text-dark'>{title}</Text>
				</Box>
			</Box>
		</Button>
	);
}
