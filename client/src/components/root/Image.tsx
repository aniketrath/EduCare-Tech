import React from 'react';

interface ImageProps {
	src: string;
	alt?: string;
}

export default function Image({ src, alt = '' }: ImageProps) {
	return <img src={src} alt={alt} className='select-none' />;
}
