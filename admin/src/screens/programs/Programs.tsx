import React from 'react';
import { deleteProgram, getPrograms } from '../../api/ProgramsHelper';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import Card from '../../components/module/ProgramCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Button from '../../components/root/Button';
import { useNavigate } from 'react-router-dom';

export default function Programs() {
	const navigate = useNavigate();
	const programs = useSelector((state: RootState) => state.program.programs);

	React.useEffect(() => {
		getPrograms();
	}, []);
	const onDelete = (id: string) => {
		deleteProgram(id);
	};
	return (
		<Box>
			<Box className='py-6 px-[4%]'>
				<Box horizontal className='items-center justify-between'>
					<Text className='text-xl font-medium capitalize'>Programs</Text>

					<Button onClick={() => navigate('/home/programs/create')}>Create</Button>
				</Box>

				<Box className='grid grid-cols-2 md:grid-cols-4 gap-3'>
					{programs.map((program, index) => (
						<Card
							id={program.id}
							title={program.title}
							photo={program.photo}
							key={index}
							onDelete={onDelete}
						/>
					))}
				</Box>
			</Box>
		</Box>
	);
}
