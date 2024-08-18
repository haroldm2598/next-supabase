'use client';
import { useEffect, useState } from 'react';
import supabase from '@/config/supabaseClient';
import { CardProps } from '@/lib/definition';

import { Button } from './ui/button';
import { Pen, Trash } from 'lucide-react';
import SkeletonCard from './SkeletonCard';
import Link from 'next/link';

export default function Card() {
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [cardItem, setCardItem] = useState<CardProps[] | null>(null);

	useEffect(() => {
		const fetchCardItem = async () => {
			const { data, error } = await supabase.from('smoothies').select();

			if (error) {
				setFetchError('Could not fetch data');
				setCardItem(null);
				console.log(error);
			}

			if (data) {
				setCardItem(data);
				setFetchError(null);
			}
		};

		fetchCardItem();
	}, []);

	const handleDelete = async ({ id }: { id: number }): Promise<void> => {
		const { data, error } = await supabase
			.from('smoothies')
			.delete()
			.eq('id', id);
		if (error) {
			console.log(error);
		} else {
			console.log(data);
		}
	};

	return (
		<>
			{fetchError && <p>{fetchError}</p>}
			{cardItem ? (
				cardItem?.map((item, index) => {
					return (
						<div
							key={index}
							className='relative w-96 min-h-40 p-2 flex flex-col gap-4 bg-white'
						>
							<h1 className='text-xl font-bold'>{item.title}</h1>

							<div className='absolute top-0 right-0'>
								<div className='flex items-center justify-center w-6 h-6 bg-purple-500 text-white rounded-sm'>
									{item.rating}
								</div>
							</div>

							<p>{item.desc}</p>

							<div className='self-end space-x-2'>
								<Button size='icon' className='bg-customGrey rounded-full'>
									<Link href={`/${item.id}`}>
										<Pen className='text-gray-500' size='20' />
									</Link>
								</Button>
								<Button
									size='icon'
									className='bg-customGrey rounded-full'
									onClick={() => handleDelete({ id: item.id })}
								>
									<Trash className='text-gray-500' size='20' />
								</Button>
							</div>
						</div>
					);
				})
			) : (
				<SkeletonCard />
			)}
		</>
	);
}
