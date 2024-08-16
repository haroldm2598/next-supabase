import { Button } from './ui/button';

const categoryLinks = [
	{ name: 'Time Created' },
	{ name: 'Title' },
	{ name: 'Rating' }
];

export default function Sort() {
	return (
		<section className='flex flex-col gap-4'>
			<h6>Order by:</h6>

			<div className='space-x-2'>
				{categoryLinks.map((item, index) => {
					return (
						<Button key={index} className='bg-customGreen' size='sm'>
							{item.name}
						</Button>
					);
				})}
			</div>
		</section>
	);
}
