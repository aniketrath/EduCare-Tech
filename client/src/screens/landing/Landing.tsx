import React from 'react';
import Box from '../../components/root/Box';
import Screen from '../../components/root/Screen';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import Text from '../../components/root/Text';
import Button from '../../components/root/Button';
import { BRAIN } from '../../assets/Images';
import Image from '../../components/root/Image';
import Footer from '../../components/module/Footer';
import { useNavigate } from 'react-router-dom';
import { IsLogged } from '../../api/AuthHelper';

export default function Landing() {
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

	const navigate = useNavigate();
	const to = (path: string) => {
		navigate('/' + path);
	};

	React.useEffect(() => {
		IsLogged();
	}, []);

	return (
		<Box className='min-h-screen bg-primary'>
			{/* Header Section */}
			<Box horizontal className='justify-between px-9 py-3 items-center border-b border-b-dark/20'>
				<Button onClick={() => navigate('/')} className='!bg-transparent px-0 py-0 '>
					<Text className='color-gradient text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF3333] to-[#D4BF00]'>
						EduCareTech
					</Text>
				</Button>

				{/* Login Button or Dashboard */}

				{isLoggedIn ? (
					<Button onClick={() => to('home')} className='rounded-full px-6  py-1.5'>
						Dashboard
					</Button>
				) : (
					<Button onClick={() => to('auth')} className='rounded-full px-6 py-1.5'>
						Login
					</Button>
				)}
			</Box>

			{/* Main Section */}
			<Screen className=' px-[7%]  '>
				<Box
					horizontal
					className='flex-col md:flex-row h-full  justify-between py-[10%] items-center '
				>
					<Box className='w-full md:w-1/2 md:h-[80%] justify-center'>
						<Box className='text-black'>
							<Text className='text-5xl font-bold '>Education with Care,</Text>
							<Text className='text-5xl font-bold'>through Technology</Text>
							<Text className='text-5xl font-bold'>A path of Learning</Text>
						</Box>
						<Box className='text-dark mt-[7%]'>
							<Text className='text-lg'>
								Learning is something that takes place daily by interacting with other people and
								the world around us. Life often throws challenges at us, there may be hurdles to
								overcome, sometimes we compare ourselves with others who perform better than us, but
								one should never get demotivated. All these obstacles should not hinder our
								development of a lifelong learning process. It enhances our perspective towards the
								world to get better opportunities, thus improving our quality of life.
							</Text>
						</Box>
					</Box>
					<Box className='md:w-2/5 md:h-[80%] justify-center py-6'>
						<Box className='w-[50%] mx-[25%] md:w-[90%] rounded-[30%] overflow-hidden'>
							<Image src={BRAIN} />
						</Box>
					</Box>
				</Box>
			</Screen>

			{/* Mission Section */}

			<Box className=' px-[7%] py-[7%] bg-primary-dark'>
				<Text className='text-4xl font-bold'>Mission</Text>
				<Box className='text-dark mt-[3%]'>
					<Text className='text-lg'>
						Our platform aims for the children of deprived backgrounds to avail all opportunities to
						grow equally like others , and also for the elderly to be technically self-sufficient ,
						to connect , and be a part of the digital world in this modern era . We aim to spread
						knowledge to all those who want to learn new things or to advance in their studies . but
						lack the Resources to do so.
					</Text>
				</Box>
			</Box>

			{/* Vision Section */}

			<Box className=' px-[7%] py-[7%]'>
				<Text className='text-4xl font-bold'>Vision</Text>
				<Box className='text-dark mt-[3%]'>
					<Text className='text-lg'>
						Provide necessary support for children to grow in education, confidence and skills to
						achieve their goal. Extend support to the elderly to carry out day to day digital
						activities in the modern society We will be here for you every step of the way. Our
						education consultants will work with you and your family to plan the next step on your
						educational journey.
					</Text>
				</Box>
			</Box>

			{/* About Section */}

			<Box className=' px-[7%] py-[7%] bg-primary-dark'>
				<Text className='text-4xl font-bold'>About</Text>
				<Box className='text-dark mt-[3%]'>
					<Text className='text-lg'>
						An educational consultant, also called a higher education consultant, assists students
						and their parents in planning for college and financial aid. EduCareTech is a digital
						education support system working towards uplifting literacy and skills in deprived
						Children and elderly by providing Education with Care through Technology .While we can
						step in to help a family at any point in their planning journey, the best time to
						contact us is in your student's freshman year.
					</Text>
				</Box>
			</Box>

			<Footer />
		</Box>
	);
}
