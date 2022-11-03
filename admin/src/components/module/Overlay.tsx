import React from 'react';
import Box from '../root/Box';
import Screen from '../root/Screen';

interface OverlayProps {
	children: React.ReactNode;
	visible: boolean;
	onClose: () => void;
}

export default function Overlay({ children, visible, onClose }: OverlayProps) {
	return (
		<Screen className={`fixed top-0 left-0 bg-black bg-opacity-50 ${visible ? '' : 'hidden'}`}>
			<Box className='center'>{children}</Box>
		</Screen>
	);
}
