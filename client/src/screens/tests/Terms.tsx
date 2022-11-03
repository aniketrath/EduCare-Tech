import React from 'react';
import Box from '../../components/root/Box';
import Text from '../../components/root/Text';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/root/Button';

export default function Terms() {
	const { id } = useParams();
	const navigate = useNavigate();

	const accept = () => {
		navigate('/test/' + id);
	};

	return (
		<Box>
			<Box className='py-6 px-[4%]'>
				<Box className='center'>
					<Text className='text-2xl font-bold'>Terms and Conditions</Text>
				</Box>
				<Box className='mt-3'>
					<ol className='list-decimal'>
						<li>
							Allow adequate time to complete this exam in one sitting before the due date and time.
							If time’s up the exam will be submited automatically.
						</li>
						<li>
							This is an restricted open book exam. The following materials and provisions are not
							permitted:
							<ul className='list-disc ml-6'>
								<li>Communication device </li>
								<li>Mobile Phones</li>
								<li>Bluetooth</li>
								<li>Earphones</li>
								<li>Microphone</li>
								<li>Pager</li>
								<li>Health Band</li>
							</ul>
						</li>
						<li>
							There are limited questions in this exam and will be presented one at a time Each
							question is worth the same marks.
						</li>
					</ol>

					<Text className='text-xl font-bold text-center mt-[50px]'>Examination Conduct</Text>
					<ol className='list-decimal'>
						<li>
							You must only attempt this exam once. Any additional attempts should only be used in
							the event where a serious technical issue has occurred and supporting evidence
							supporting this will be required.
						</li>
						<li>
							You are not permitted to switch tabs or application during the exam. If found so your
							exam will be rejected.
						</li>
						<li>
							You are not permitted to obtain assistance by improper means or ask for help from or
							give help to any other person.
						</li>
						<li>
							You are not permitted to take screenshots, record the screen, copy and paste questions
							or answers or otherwise attempt to take any of the content of this exam out of the
							exam for any purpose.
						</li>
						<li>
							You are not permitted to post any requests for clarification of exam content. Answer
							all questions to the best of your ability and perception of the questions’ intent,
							make reasonable assumptions if necessary, to answer all questions. UTS assessments
							never apply negative marking techniques.
						</li>
						<li>Misconduct action will be taken against you if you breach university rules. </li>
					</ol>
					<Text className='text-xl font-bold text-center mt-[50px]'>Candidate declaration</Text>
					<Text>By attempting this exam, I acknowledge that</Text>

					<Text>
						I agree to be bound by the Organization rules, codes of conduct, and other policies
						relating to examinations.
					</Text>
				</Box>

				<Box className='mt-[50px] center'>
					<Button onClick={accept} className='text-light font-semibold  bg-green-500 w-[200px]'>
						Accept
					</Button>
				</Box>
			</Box>
		</Box>
	);
}
