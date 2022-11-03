import React from 'react';

export default function Loading() {
	return (
		<div className='w-screen h-screen bg-dark'>
			<div id='loop' className='center-abs'></div>
			<div id='bike-wrapper' className='center-abs'>
				<div id='bike' className='centerBike'></div>
			</div>
		</div>
	);
}
