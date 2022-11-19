import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IsLogged, Login as ServerLogin } from '../../api/AuthHelper';
import { BRAIN, GOOGLE } from '../../assets/Images';
import Loading from '../../components/module/Loading';
import Box from '../../components/root/Box';
import Button from '../../components/root/Button';
import Image from '../../components/root/Image';
import Screen from '../../components/root/Screen';
import Text from '../../components/root/Text';
import { useGoogleLogin } from '@react-oauth/google';
import { showAlert } from '../../store/UtilsReducer';
import { useDispatch } from 'react-redux';

export default function Auth() {
	const [isLoading, setLoading] = React.useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	React.useEffect(() => {
		IsLogged().then((res) => {
			if (res) {
				setLoading(false);
				navigate('/home');
			} else {
				setLoading(false);
			}
		});
	}, [navigate]);

	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			const accessToken = tokenResponse.access_token;
			ServerLogin(accessToken).then((res) => {
				if (res) {
					navigate('/home');
				} else {
					dispatch(showAlert('Login Failed'));
				}
			});
		},
	});

	if (isLoading) return <Loading />;

	return (
		<Box className='bg-primary min-h-screen'>
			<Box horizontal className='justify-between px-9 py-3 items-center border-b border-b-dark/20'>
				<Button onClick={() => navigate('/')} className='!bg-transparent px-0 py-0 '>
					<Text className='color-gradient text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF3333] to-[#D4BF00]'>
						EduCareTech
					</Text>
				</Button>
			</Box>
			<Screen className=' px-[7%] center'>
				<Box horizontal className='h-full  justify-between center'>
					<Box className='w-1/2 h-[80%] justify-center'>
						<Box className='text-black'>
							<Text className='text-5xl font-bold '>Education with care</Text>
							<Text className='text-5xl font-bold'>through Technology</Text>
						</Box>
						<Button
							onClick={() => login()}
							className='w-max mt-[7%] px-1 py-0  bg-blue-600/90 hover:bg-blue-600'
						>
							<Box horizontal className='w-full text-white px-4 py-2 gap-3 items-center '>
								<Box className='w-6'>
									<Image src={GOOGLE} />
								</Box>
								<Text className='!bg-transparent font-semibold'>Continue With Google</Text>
							</Box>
						</Button>
					</Box>
					<Box className='w-2/5 h-[80%] justify-center'>
						<Box className='w-[90%] rounded-[30%] overflow-hidden'>
							<Image src={BRAIN} />
						</Box>
					</Box>
				</Box>
			</Screen>
		</Box>
	);
}
