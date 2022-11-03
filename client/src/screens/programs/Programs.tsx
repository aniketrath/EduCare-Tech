import React from 'react';
import { getPrograms } from '../../api/ProgramsHelper';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import Card from '../../components/module/ProgramCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Programs() {
	const programs = useSelector((state: RootState) => state.program.programs);

	React.useEffect(() => {
		getPrograms();
	}, []);
	return (
		<Box>
			<Box className='py-6 px-[4%]'>
				<Box horizontal className='items-center justify-between'>
					<Text className='text-xl font-medium capitalize'>Programs</Text>
				</Box>

				<Box className='grid grid-cols-2 md:grid-cols-4 gap-3'>
					{programs.map((program, index) => (
						<Card id={program.id} title={program.title} photo={program.photo} key={index} />
					))}
				</Box>
			</Box>
		</Box>
	);
}
