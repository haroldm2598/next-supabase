'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '@/config/supabaseClient';
import { CardProps } from '@/lib/definition';
import { useStore } from '@/hooks/useSort';

import { Button } from './ui/button';
import { Pen } from 'lucide-react';
import SkeletonCard from './SkeletonCard';
import DeleteButton from './DeleteButton';

export default function Card() {
	const { orderBy } = useStore();
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [cardItem, setCardItem] = useState<CardProps[] | []>([]);

	useEffect(() => {
		const fetchCardItem = async () => {
			const { data, error } = await supabase
				.from('smoothies')
				.select()
				.order(orderBy, { ascending: true });

			if (error) {
				setFetchError('Could not fetch data');
				setCardItem([]);
				console.log(error);
			}

			if (data) {
				setCardItem(data);
				setFetchError(null);
			}
		};

		fetchCardItem();
	}, [orderBy]);

	const handleDeleteSuccess = (id: number) => {
		setCardItem((prevData) => prevData?.filter((item) => item.id !== id));
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
								<DeleteButton
									id={item.id}
									onSuccess={() => handleDeleteSuccess(item.id)}
								/>
								{/* <Button
									size='icon'
									className='bg-customGrey rounded-full'
									onClick={() => handleDelete({ id: item.id })}
								>
									<Trash className='text-gray-500' size='20' />
								</Button> */}
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
