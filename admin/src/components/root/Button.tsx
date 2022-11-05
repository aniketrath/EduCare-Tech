import React from 'react';

interface ButtonProps {
	children: React.ReactNode;
	className?: string;
	onClick?: (() => void) | ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void);
	disabled?: boolean;
}

export default function Button({
	children,
	className = '',
	onClick = () => {},
	disabled = false,
}: ButtonProps) {
	return (
		<div
			className={`bg-black text-white px-4 py-2 rounded-md cursor-pointer ${className} center`}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
