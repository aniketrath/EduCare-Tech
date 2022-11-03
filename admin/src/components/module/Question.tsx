import React from 'react';
import { deleteQuestion, saveQuestion } from '../../api/TestsHelper';
import { BIN } from '../../assets/Images';
import { Question as IQuestion } from '../../store/TestReducer';
import Box from '../root/Box';
import Button from '../root/Button';
import Image from '../root/Image';
import Text from '../root/Text';
import TextInput from '../root/TextInput';

type Props = {
	question: string;
	option1: string;
	option2: string;
	option3: string;
	option4: string;
	answer: string;
	onSave?: (question: IQuestion) => void;
	onUpdate?: (question: IQuestion) => void;
	onDelete?: (id: string) => void;

	dummy?: boolean;
};

export default function Question(props: Props) {
	const [state, setState] = React.useState<Props>(props);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState((prev) => ({ ...prev, answer: e.target.value }));
	};

	const handleTextChange = (key: string, value: string) => {
		setState((prev) => ({ ...prev, [key]: value }));
	};

	const save = () => {
		saveQuestion(state as IQuestion).then((res: any) => {
			if (res.updated) {
				if (props.onUpdate) {
					props.onUpdate(res);
				}
			} else {
				if (props.onSave) {
					props.onSave(res);
				}
			}
			if (props.dummy) {
				setState({
					question: '',
					option1: '',
					option2: '',
					option3: '',
					option4: '',
					answer: '',
				});
			}
		});
	};
	const deleteHandler = () => {
		const question = state as IQuestion;
		deleteQuestion(question).then((res: any) => {
			if (props.onDelete) {
				props.onDelete(question.id);
			}
		});
	};

	return (
		<Box>
			<Box className='py-6 px-[4%] gap-3 bg-white rounded-lg relative'>
				<Box horizontal className=' gap-3'>
					<Text className='font-medium'>Q.{'  '}</Text>
					<textarea
						className={`bg-white w-full border border-gray-300 rounded-md py-2 px-4 text-dark focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500`}
						rows={5}
						value={state.question}
						placeholder='Question Text'
						onChange={(e) => handleTextChange('question', e.target.value)}
					/>
				</Box>
				<Box className='gap-3'>
					<Box horizontal className='items-center gap-3 '>
						<input onChange={handleChange} checked={state.answer === '1'} type='radio' value='1' />
						<TextInput
							className='w-2/3'
							value={state.option1}
							placeholder='Option 1'
							onChange={(text) => handleTextChange('option1', text)}
						/>
					</Box>
					<Box horizontal className='items-center gap-3'>
						<input onChange={handleChange} checked={state.answer === '2'} type='radio' value='2' />
						<TextInput
							className='w-2/3'
							value={state.option2}
							placeholder='Option 2'
							onChange={(text) => handleTextChange('option2', text)}
						/>
					</Box>
					<Box horizontal className='items-center gap-3'>
						<input onChange={handleChange} checked={state.answer === '3'} type='radio' value='3' />
						<TextInput
							className='w-2/3'
							value={state.option3}
							placeholder='Option 3'
							onChange={(text) => handleTextChange('option3', text)}
						/>
					</Box>
					<Box horizontal className='items-center gap-3'>
						<input onChange={handleChange} checked={state.answer === '4'} type='radio' value='4' />
						<TextInput
							className='w-2/3'
							value={state.option4}
							placeholder='Option 4'
							onChange={(text) => handleTextChange('option4', text)}
						/>
					</Box>
				</Box>

				<Box horizontal className='mt-3 absolute w-[300px] h-[40px] right-6 bottom-6 gap-2'>
					<Button className='w-full' onClick={save}>
						Save / Modify
					</Button>
					{!props.dummy ? (
						<Button
							onClick={deleteHandler}
							className='w-[60px] center h-full px-0 py-0  bg-red-500'
						>
							<Image src={BIN} className='w-[20px]' />
						</Button>
					) : null}
				</Box>
			</Box>
		</Box>
	);
}
