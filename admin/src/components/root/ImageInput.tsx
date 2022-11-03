import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { ADD_FILE } from '../../assets/Images';
import { showAlert } from '../../store/UtilsReducer';
import Box from './Box';
import Image from './Image';
import Text from './Text';

interface ImageInputProps {
	onChange?: (file: File) => void;
	className?: string;
}

export default function ImageInput(props: ImageInputProps) {
	return (
		<>
			<DropArea
				onFileSelected={(file) => {
					props.onChange?.(file);
				}}
			/>
		</>
	);
}
const DropArea = ({ onFileSelected }: { onFileSelected: (file: File) => void }) => {
	const dispatch = useDispatch();

	const onDrop = React.useCallback(
		(acceptedFiles: File[], fileRejections: any) => {
			if (fileRejections.length > 0) {
				if (fileRejections.length > 1) {
					return dispatch(showAlert("You can't upload more than one file"));
				} else if (!fileRejections[0].file.type.includes('image')) {
					return dispatch(showAlert('Only PNG files are allowed'));
				}
				return;
			}
			if (acceptedFiles.length === 0) {
				return dispatch(showAlert('No file selected'));
			}

			if (acceptedFiles.length !== 1) {
				return dispatch(showAlert("You can't upload more than one file"));
			}

			const file = acceptedFiles[0];
			onFileSelected(file);
		},
		[onFileSelected, dispatch]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: {
			image: ['image/*'],
		},
		validator: (file: File) => {
			if (!file || !file.type.includes('image')) {
				return {
					code: 'INVALID_FILE_TYPE',
					message: 'Only PNG files are allowed',
				};
			}
			return null;
		},
	});

	return (
		<div
			{...getRootProps()}
			className='h-full  border border-dashed border-orange-500 bg-orange-200/5 rounded-md m-2 md:m-6 p-2 flex-center  !cursor-pointer'
		>
			<input {...getInputProps()} />

			<Box className='center text-dark'>
				<Box className='h-1/4 w-1/4 '>
					<Image src={ADD_FILE} />
				</Box>
				{isDragActive ? (
					<Text className='text-dark text-bold mt-4'>Drop your file here</Text>
				) : (
					<>
						<Box
							horizontal
							className='flex-col md:flex-row items-center font-semibold mt-4 text-dark '
						>
							<Text className='md:mr-2 underline underline-offset-2'>Click to upload</Text>
							<Text>or drag and drop</Text>
						</Box>
						<Text className={`text-sm font-light mt-3 text-dark  text-center `}>
							{'(Only *image files will be accepted)*'}
						</Text>
					</>
				)}
			</Box>
		</div>
	);
};
