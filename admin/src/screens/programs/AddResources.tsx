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
import { addProgramResources } from '../../api/ProgramsHelper';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import PDFInput from '../../components/root/PDFInput';

type Data = {
	title: string;
	file: File | null;
	type: 'PDF' | 'VIDEO';
	link: string;
};

export default function AddResources() {
	const { id } = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [data, setData] = React.useState<Data>({
		title: '',
		link: '',
		file: null,
		type: 'PDF',
	});

	const submit = () => {
		if (!id) {
			return dispatch(showAlert('Invalid Program ID'));
		}
		if (!data.title || (!data.file && !data.link)) {
			return dispatch(showAlert('Please fill all fields'));
		}

		dispatch(showAlert('Adding resources... Please wait'));
		addProgramResources(id, data).then((res) => {
			navigate('/home/programs/' + id);
		});
	};

	if (!id) {
		return <Navigate to='/home/programs' replace />;
	}

	return (
		<Box>
			<Screen>
				<Box>
					<Box className='py-6 px-[4%] center'>
						<Box horizontal className='center'>
							<Text className='text-xl font-medium capitalize text-dark'>Add Resources</Text>
						</Box>
						<Box className='bg-primary-dark mt-9 p-6 rounded-lg'>
							<Box className='w-[350px]'>
								<Text className='text-base font-medium capitalize text-dark'>Title</Text>
								<TextInput
									value={data.title}
									onChange={(text) => setData({ ...data, title: text })}
								/>

								<select
									className='mt-2 w-full border border-primary-light rounded-lg p-2'
									onChange={(e) => {
										const type = e.target.value as 'PDF' | 'VIDEO';
										setData({ ...data, type });
									}}
								>
									<option value='PDF'>PDF</option>
									<option value='VIDEO'>VIDEO</option>
								</select>
							</Box>
							<Box className='mt-9 w-[350px] center'>
								{data.type === 'PDF' ? (
									<PDFInput
										onChange={(file) => {
											setData({ ...data, file });
										}}
									/>
								) : (
									<Box className='w-full'>
										<Text className='text-base font-medium capitalize text-dark'>Video Link</Text>
										<TextInput
											value={data.link}
											onChange={(text) => setData({ ...data, link: text })}
										/>
									</Box>
								)}
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
