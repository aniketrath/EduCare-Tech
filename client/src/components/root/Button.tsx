import React from 'react';

interface ButtonProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
}

export default function Button({
	children,
	className = '',
	onClick = () => {},
	disabled = false,
}: ButtonProps) {
	return (
		<button
			className={`bg-black text-white px-4 py-2 rounded-md ${className} `}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
