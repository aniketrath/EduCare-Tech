import React from 'react';
import { deleteCollection } from '../../api/CollectionsHelper';
import { BIN, PDF, YOUTUBE } from '../../assets/Images';
import Box from '../root/Box';
import Button from '../root/Button';
import Image from '../root/Image';
import Text from '../root/Text';

interface CardPropsPDF {
	title: string;
	pdf: true;
	id: string;
	link: string;
	onDelete?: (id: string) => void;
}
interface CardPropsVideo {
	title: string;
	id: string;
	video: true;
	link: string;
	onDelete?: (id: string) => void;
}

export default function CollectionCard(props: CardPropsPDF | CardPropsVideo) {
	const { title, link, id } = props;
	const isPDF = 'pdf' in props;

	return (
		<Button
			onClick={() => window.open(link, '_blank')}
			className=' !bg-transparent hover:!bg-primary-dark w-full center relative h-[65px] max-w-[350px] text-dark '
		>
			<Box
				horizontal
				className='w-full h-full bg-white my-1 px-2 items-center rounded-md gap-2 group relative'
			>
				<Box className='w-6  overflow-hidden drop-shadow-md'>
					<Image src={isPDF ? PDF : YOUTUBE} />
				</Box>

				<Box>
					<Text className='text-center text-dark'>{title}</Text>
				</Box>
				<Button
					onClick={() => props.onDelete && props.onDelete(id)}
					className='px-2 aspect-square bg-red-500 hidden group-hover:block absolute right-2 z-10'
				>
					<Image src={BIN} className='w-4' />
				</Button>
			</Box>
		</Button>
	);
}
