import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getCollections } from '../../api/CollectionsHelper';
import { deleteProgramResource, getProgram } from '../../api/ProgramsHelper';
import Card from '../../components/module/CollectionCard';
import Loading from '../../components/module/Loading';
import Box from '../../components/root/Box';
import Button from '../../components/root/Button';
import Text from '../../components/root/Text';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../utils/Consts';

export default function Program() {
	const navigate = useNavigate();
	const { id } = useParams();

	if (!id) {
		return <Navigate to='/home/programs' replace />;
	}
	const program = getProgram(id);
	if (!program) {
		return <Navigate to='/home/programs' replace />;
	}
	const { title, pdfs, videos } = program;

	const onDelete = (resourceID: string) => {
		deleteProgramResource(id, resourceID);
	};

	return (
		<Box>
			<Box horizontal className='py-6 px-[4%]  items-center justify-between'>
				<Box horizontal className='items-center gap-1'>
					<Link to='/home/programs'>
						<Text className='text-xl font-medium capitalize'>Programs </Text>
					</Link>
					<Text className='text-xl font-medium capitalize'>&gt; {title}</Text>
				</Box>

				<Button onClick={() => navigate('/home/programs/add-resources/' + id)}>
					Add Resources
				</Button>
			</Box>
			<Box className='pt-6 px-[7%]'>
				{pdfs.length > 0 && (
					<>
						<Box horizontal className='items-center justify-between'>
							<Text className='text-xl font-medium capitalize'>PDFs</Text>
						</Box>

						<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
							{pdfs.map((pdf, index) => (
								<Card
									key={index}
									id={pdf.id}
									title={pdf.title}
									pdf
									link={SERVER_URL + 'file/' + pdf.link}
									onDelete={onDelete}
								/>
							))}
						</Box>
					</>
				)}

				{videos.length > 0 && (
					<>
						<Box horizontal className='items-center justify-between'>
							<Text className='text-xl font-medium capitalize'>Videos</Text>
						</Box>

						<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
							{videos.map((video, index) => (
								<Card
									key={index}
									id={video.id}
									title={video.title}
									video
									link={video.link}
									onDelete={onDelete}
								/>
							))}
						</Box>
					</>
				)}
			</Box>
		</Box>
	);
}
