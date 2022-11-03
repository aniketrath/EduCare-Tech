import React from 'react';
import { PDF, YOUTUBE } from '../../assets/Images';
import Box from '../root/Box';
import Button from '../root/Button';
import Image from '../root/Image';
import Text from '../root/Text';

interface CardPropsPDF {
	title: string;
	pdf: true;
	link: string;
}
interface CardPropsVideo {
	title: string;
	video: true;
	link: string;
}

export default function CollectionCard(props: CardPropsPDF | CardPropsVideo) {
	const { title, link } = props;
	const isPDF = 'pdf' in props;

	return (
		<Button
			onClick={() => window.open(link, '_blank')}
			className='!bg-transparent hover:!bg-primary-dark w-full center relative h-[65px] max-w-[350px] text-dark '
		>
			<Box horizontal className='w-full h-full bg-white my-1 px-2 items-center rounded-md gap-2'>
				<Box className='w-6  overflow-hidden drop-shadow-md'>
					<Image src={isPDF ? PDF : YOUTUBE} />
				</Box>

				<Box>
					<Text className='text-center text-dark'>{title}</Text>
				</Box>
			</Box>
		</Button>
	);
}
