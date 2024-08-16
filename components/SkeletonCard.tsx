import React from 'react';

export default function SkeletonCard() {
	return (
		<div className='relative w-96 min-h-40 p-2 flex flex-col gap-4 bg-white animate-pulse'>
			<div className='h-6 bg-gray-300 rounded w-1/3'></div>

			<div className='absolute top-0 right-0'>
				<div className='flex items-center justify-center w-6 h-6 bg-gray-300 rounded-sm'></div>
			</div>

			<div className='h-4 bg-gray-300 rounded w-full'></div>

			<div className='self-end space-x-2 flex'>
				<div className='w-10 h-10 bg-gray-300 rounded-full'></div>
				<div className='w-10 h-10 bg-gray-300 rounded-full'></div>
			</div>
		</div>
	);
}
