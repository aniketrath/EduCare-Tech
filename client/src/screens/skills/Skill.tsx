import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getSkill } from '../../api/SkillsHelper';
import Card from '../../components/module/CollectionCard';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import { SERVER_URL } from '../../utils/Consts';

export default function Skill() {
	const { id } = useParams();

	if (!id) {
		return <Navigate to='/home/skills' replace />;
	}

	const skill = getSkill(id);
	if (!skill) {
		return <Navigate to='/home/skills' replace />;
	}
	const { title, pdfs, videos } = skill;

	return (
		<Box>
			<Box horizontal className='py-6 px-[4%] items-center gap-1'>
				<Link to='/home/skills'>
					<Text className='text-xl font-medium capitalize'>Skill Set </Text>
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
								<Card key={index} title={pdf.title} pdf link={SERVER_URL + 'file/' + pdf.link} />
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
