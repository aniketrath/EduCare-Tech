import React from 'react';

interface TextInputProps {
	className?: string;
	onChange?: (text: string) => void;
	placeholder?: string;
	value?: string;
}

export default function TextInput(props: TextInputProps) {
	return (
		<input
			className={`bg-white border border-gray-300 rounded-md py-2 px-4 text-dark focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 ${props.className}`}
			type='text'
			placeholder={props.placeholder}
			value={props.value}
			onChange={(e) => props.onChange && props.onChange(e.target.value)}
		/>
	);
}
