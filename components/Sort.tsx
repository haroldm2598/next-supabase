'use client';
import { Button } from './ui/button';
import { useStore } from '@/hooks/useSort';

export default function Sort() {
	const { setOrderBy } = useStore();

	const categoryLinks = [
		{ name: 'Time Created', value: 'created_at' },
		{ name: 'Title', value: 'title' },
		{ name: 'Rating', value: 'rating' }
	];

	const handleClick = (value: string) => {
		if (setOrderBy) {
			setOrderBy(value);
		}
	};

	return (
		<section className='flex flex-col gap-4'>
			<h6>Order by:</h6>

			<div className='space-x-2'>
				{categoryLinks.map((item, index) => {
					return (
						<Button
							key={index}
							className='bg-customGreen'
							size='sm'
							onClick={() => handleClick(item.value)}
						>
							{item.name}
						</Button>
					);
				})}
			</div>
		</section>
	);
}
