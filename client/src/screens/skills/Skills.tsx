import React from 'react';
import { getSkills } from '../../api/SkillsHelper';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import Card from '../../components/module/SkillCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Skills() {
	const skills = useSelector((state: RootState) => state.skill.skills);

	React.useEffect(() => {
		getSkills();
	}, []);

	return (
		<Box>
			<Box className='py-6 px-[4%]'>
				<Box horizontal className='items-center justify-between'>
					<Text className='text-xl font-medium capitalize'>Skills</Text>
				</Box>

				<Box className='grid grid-cols-2 md:grid-cols-4 gap-3'>
					{skills.map((skill, index) => (
						<Card id={skill.id} title={skill.title} photo={skill.photo} key={index} />
					))}
				</Box>
			</Box>
		</Box>
	);
}
