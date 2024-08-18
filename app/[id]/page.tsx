import UpdateForm from '@/components/UpdateForm';
import supabase from '@/config/supabaseClient';

interface IdProps {
	params: {
		id: string;
	};
}

export default async function page({ params }: IdProps) {
	const { data } = await supabase
		.from('smoothies')
		.select('*')
		.eq('id', params.id)
		.single();

	return (
		<div className='pt-5 flex justify-center gap-4'>
			<div className='p-4 flex flex-col gap-4 bg-white min-w-96'>
				<UpdateForm
					id={data.id}
					title={data.title}
					desc={data.desc}
					rating={data.rating}
				/>
			</div>
		</div>
	);
}
