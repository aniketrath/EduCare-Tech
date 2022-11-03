import { useEffect, useState } from 'react';

const useCountdown = (time: number) => {
	const countDownDate = new Date(time).getTime();

	const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

	useEffect(() => {
		const interval = setInterval(() => {
			if (countDownDate - new Date().getTime() <= 0) {
				clearInterval(interval);
			}

			setCountDown(countDownDate - new Date().getTime());
		}, 1000);

		return () => clearInterval(interval);
	}, [countDownDate]);

	return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
	// calculate time left
	if (countDown <= 0) {
		return {
			completed: true,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		};
	}
	const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
	const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

	const completed = countDown <= 0;

	return { days, hours, minutes, seconds, completed };
};

export { useCountdown };
