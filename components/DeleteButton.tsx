import supabase from '@/config/supabaseClient';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';

interface DeleteButton {
	id: number;
	onSuccess?: () => void;
}

export default function DeleteButton({ id, onSuccess }: DeleteButton) {
	// async ({ id }: { id: number }): Promise<void>
	const handleDelete = async () => {
		const { data, error } = await supabase
			.from('smoothies')
			.delete()
			.eq('id', id);
		if (error) {
			console.log(error);
		} else {
			console.log(data);
		}

		if (onSuccess) {
			onSuccess();
		}
	};

	return (
		<Button
			size='icon'
			className='bg-customGrey rounded-full'
			onClick={handleDelete}
		>
			<Trash className='text-gray-500' size='20' />
		</Button>
	);
}
