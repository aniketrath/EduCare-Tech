import React from 'react';
import { deleteCollection, getCollections } from '../../api/CollectionsHelper';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import Card from '../../components/module/CollectionCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../../components/root/Button';
import { useNavigate } from 'react-router-dom';
import { ServerURL } from '../../api/Axios';

export default function Collections() {
	const navigate = useNavigate();
	const collections = useSelector((state: RootState) => state.collection);

	React.useEffect(() => {
		getCollections();
	}, []);

	const { pdfs, videos } = collections;

	const onDelete = (id: string) => {
		deleteCollection(id);
	};

	return (
		<Box>
			<Box className='py-6 px-[4%]'>
				<Box horizontal className='items-center justify-between'>
					<Text className='text-xl font-medium capitalize'>PDFs</Text>
					<Button onClick={() => navigate('/home/collections/create')}>Create</Button>
				</Box>

				<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
					{pdfs.map((pdf, index) => (
						<Card
							key={index}
							id={pdf.id}
							title={pdf.title}
							pdf
							link={ServerURL + 'file/' + pdf.link}
							onDelete={onDelete}
						/>
					))}
				</Box>

				<Box horizontal className='items-center justify-between'>
					<Text className='text-xl font-medium capitalize'>Videos</Text>
				</Box>

				<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
					{videos.map((video, index) => (
						<Card
							id={video.id}
							key={index}
							title={video.title}
							video
							link={video.link}
							onDelete={onDelete}
						/>
					))}
				</Box>
			</Box>
		</Box>
	);
}
