import Card from '@/components/Card';
import Sort from '@/components/Sort';

// const cardItem: CardProps[] = [
// 	{
// 		title: 'Berry Blaster',
// 		desc: 'mix all berries together in a huge jug and add some lemonade',
// 		rating: 3
// 	},
// 	{
// 		title: 'mario madness',
// 		desc: 'mix all berries together with strawberries and juice add some lemonade',
// 		rating: 8
// 	},
// 	{
// 		title: 'Protein Blaster',
// 		desc: 'blah blah',
// 		rating: 9
// 	}
// ];

export default function page() {
	return (
		<main className='py-4 px-2 xl:px-0 mx-auto max-w-7xl'>
			<div className='flex flex-col gap-8'>
				<Sort />

				<section className='flex flex-wrap gap-10'>
					<Card />
				</section>
			</div>
		</main>
	);
}
