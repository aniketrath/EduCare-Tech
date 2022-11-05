import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ServerURL } from '../../api/Axios';
import { getCollections } from '../../api/CollectionsHelper';
import { getProgram } from '../../api/ProgramsHelper';
import Card from '../../components/module/CollectionCard';
import Loading from '../../components/module/Loading';
import Box from '../../components/root/Box';
import Button from '../../components/root/Button';
import Text from '../../components/root/Text';

export default function Program() {
	const { id } = useParams();

	if (!id) {
		return <Navigate to='/home/programs' replace />;
	}
	const program = getProgram(id);
	if (!program) {
		return <Navigate to='/home/programs' replace />;
	}
	const { title, pdfs, videos } = program;

	return (
		<Box>
			<Box horizontal className='py-6 px-[4%] items-center gap-1'>
				<Link to='/home/programs'>
					<Text className='text-xl font-medium capitalize'>Programs </Text>
				</Link>
				<Text className='text-xl font-medium capitalize'>&gt; {title}</Text>
			</Box>
			<Box className='pt-6 px-[7%]'>
				{pdfs.length > 0 && (
					<>
						<Box horizontal className='items-center justify-between'>
							<Text className='text-xl font-medium capitalize'>PDFs</Text>
						</Box>

						<Box className='my-6 grid grid-cols-2 md:grid-cols-4 gap-3'>
							{pdfs.map((pdf, index) => (
								<Card key={index} title={pdf.title} pdf link={ServerURL + 'file/' + pdf.link} />
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
								<Card key={index} title={video.title} video link={video.link} />
							))}
						</Box>
					</>
				)}
			</Box>
		</Box>
	);
}
