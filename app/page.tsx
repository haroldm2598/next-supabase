import Card from '@/components/Card';
import Sort from '@/components/Sort';

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
