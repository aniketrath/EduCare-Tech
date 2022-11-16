import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { showAlert } from '../../store/UtilsReducer';
import Box from '../root/Box';
import Text from '../root/Text';

export default function AlertBar() {
	const alert = useSelector((state: RootState) => state.utils.alert);
	const dispatch = useDispatch();

	React.useEffect(() => {
		const alertBar = document.querySelector('.alert-bar');

		if (!alertBar) {
			return;
		}
		let timer: any = 0;
		if (alert) {
			alertBar.classList.add('show');
			timer = setTimeout(() => {
				dispatch(showAlert(''));
			}, 15000);
		} else {
			alertBar.classList.remove('show');
		}

		return () => clearTimeout(timer);
	}, [alert, dispatch]);

	return (
		<Box
			horizontal
			className='fixed -bottom-[48px] left-0 w-full h-[40px] z-50 bg-green-500 text-white px-4 items-center alert-bar'
		>
			<Text className='text-white transition-all '>{alert}</Text>
		</Box>
	);
}
