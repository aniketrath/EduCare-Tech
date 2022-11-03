/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FEEACC',
				'primary-dark': '#FBDAA7',
				light: '#F6EFEF',
				dark: '#353535',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
