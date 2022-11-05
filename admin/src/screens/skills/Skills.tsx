import React from 'react';
import { deleteSkill, getSkills } from '../../api/SkillsHelper';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import Card from '../../components/module/SkillCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../../components/root/Button';
import { useNavigate } from 'react-router-dom';

export default function Skills() {
	const navigate = useNavigate();
	const skills = useSelector((state: RootState) => state.skill.skills);

	React.useEffect(() => {
		getSkills();
	}, []);

	const onDelete = (id: string) => {
		deleteSkill(id);
	};

	return (
		<Box>
			<Box className='py-6 px-[4%]'>
				<Box horizontal className='items-center justify-between'>
					<Text className='text-xl font-medium capitalize'>Skills</Text>
					<Button onClick={() => navigate('/home/skills/create')}>Create</Button>
				</Box>

				<Box className='grid grid-cols-2 md:grid-cols-4 gap-3'>
					{skills.map((skill, index) => (
						<Card
							id={skill.id}
							title={skill.title}
							photo={skill.photo}
							key={index}
							onDelete={onDelete}
						/>
					))}
				</Box>
			</Box>
		</Box>
	);
}
