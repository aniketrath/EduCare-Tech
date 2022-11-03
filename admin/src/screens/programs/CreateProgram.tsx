import React from 'react';
import Box from '../../components/root/Box';
import Button from '../../components/root/Button';
import Image from '../../components/root/Image';
import ImageInput from '../../components/root/ImageInput';
import Screen from '../../components/root/Screen';
import Text from '../../components/root/Text';
import TextInput from '../../components/root/TextInput';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../store/UtilsReducer';
import { createProgram } from '../../api/ProgramsHelper';
import { useNavigate } from 'react-router-dom';

type Data = {
	title: string;
	file: File | null;
	preview: string;
};

export default function CreateProgram() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [data, setData] = React.useState<Data>({
		title: '',
		file: null,
		preview: '',
	});

	const submit = () => {
		if (!data.title || !data.file) {
			return dispatch(showAlert('Please fill all fields'));
		}
		dispatch(showAlert('Creating program... Please wait'));
		createProgram(data.title, data.file).then((res) => {
			navigate('/home/programs');
		});
	};

	return (
		<Box>
			<Screen>
				<Box>
					<Box className='py-6 px-[4%] center'>
						<Box horizontal className='center'>
							<Text className='text-xl font-medium capitalize text-dark'>Create Program</Text>
						</Box>
						<Box className='bg-primary-dark mt-9 p-6 rounded-lg'>
							<Box className='w-[350px]'>
								<Text className='text-base font-medium capitalize text-dark'>Title</Text>
								<TextInput
									value={data.title}
									onChange={(text) => setData({ ...data, title: text })}
								/>
							</Box>
							<Box className='mt-9 w-[350px] center'>
								{data.file && (
									<Box className=' w-[100px] h-[100px] aspect-square overflow-hidden rounded-full z-10 drop-shadow-md border border-primary/80'>
										<Image src={data.preview} />
									</Box>
								)}
								<ImageInput
									onChange={(file) => {
										const preview = URL.createObjectURL(file);

										setData({ ...data, file, preview });
									}}
								/>
							</Box>

							<Button onClick={submit} className='mt-9'>
								Create
							</Button>
						</Box>
					</Box>
				</Box>
			</Screen>
		</Box>
	);
}
