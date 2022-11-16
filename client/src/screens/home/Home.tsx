import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { Logout } from '../../api/AuthHelper';
import Footer from '../../components/module/Footer';
import Box from '../../components/root/Box';
import Button from '../../components/root/Button';
import Text from '../../components/root/Text';
import { RootState } from '../../store/store';
const Quote = require('inspirational-quotes');

export default function Home() {
	const outlet = useOutlet();
	const location = useLocation();

	const navigate = useNavigate();

	const to = (path: string) => {
		navigate('/home/' + path);
	};

	const logout = () => {
		Logout().then(() => navigate('/'));
	};

	const contains = (path: string) => {
		return location.pathname.includes(path);
	};

	return (
		<Box className='min-h-screen bg-primary'>
			<Box
				horizontal
				className='justify-between px=3 md:px-9 py-3 items-center border-b border-b-dark/20'
			>
				<Button onClick={() => navigate('/')} className='!bg-transparent px-0 py-0 hidden md:block'>
					<Text className='color-gradient text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF3333] to-[#D4BF00]'>
						EduCareTech
					</Text>
				</Button>

				{/* Login Button or Dashboard */}

				<Box horizontal className=' overflow-y-scroll justify-end'>
					<Button
						onClick={() => to('programs')}
						className={`!bg-transparent !text-dark font-medium ${
							contains('programs') ? 'underline underline-offset-4' : 'no-underline'
						}`}
					>
						Programs
					</Button>
					<Button
						onClick={() => to('skills')}
						className={`!bg-transparent !text-dark font-medium ${
							contains('skills') ? 'underline underline-offset-4' : 'no-underline'
						}`}
					>
						Skill Set
					</Button>
					<Button
						onClick={() => to('collections')}
						className={`!bg-transparent !text-dark font-medium ${
							contains('collections') ? 'underline underline-offset-4' : 'no-underline'
						}`}
					>
						Collections
					</Button>
					<Button
						onClick={() => to('tests')}
						className={`!bg-transparent !text-dark font-medium ${
							contains('tests') ? 'underline underline-offset-4' : 'no-underline'
						}`}
					>
						MCQs
					</Button>
					<Button onClick={logout} className='!bg-transparent !text-dark font-medium '>
						Logout
					</Button>
				</Box>
			</Box>

			<Box className='flex-1 flex'>{outlet || <Placeholder />}</Box>

			<Footer />
		</Box>
	);
}

function Placeholder() {
	const { name } = useSelector((state: RootState) => state.auth);
	const quote = Quote.getQuote();

	return (
		<Box>
			<Box className='py-6 px-[4%]'>
				<Box horizontal className='items-center justify-between'>
					<Text className='text-xl font-medium capitalize'>Welcome Back, {name}</Text>
				</Box>
				<Box className='px-[10%]'>
					<Text className='mt-[10%] text-lg'>{quote.text}</Text>
					<Text className='text-sm font-semibold text-right'>~{quote.author}</Text>
				</Box>
			</Box>
		</Box>
	);
}
