'use client';
import supabase from '@/config/supabaseClient';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormFieldNames = 'title' | 'description' | 'rating';

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'title must be at least 2 characters.'
	}),
	description: z.string().min(2, {
		message: 'description is required'
	}),
	rating: z.number().min(1, {
		message: 'rating is required'
	})
});

const formArr: { name: FormFieldNames; placeholder: string; type: string }[] = [
	{ name: 'title', placeholder: 'enter a title', type: 'text' },
	{ name: 'description', placeholder: 'enter a description', type: 'text' },
	{ name: 'rating', placeholder: 'enter a rating', type: 'number' }
];

export default function CreateForm() {
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			rating: 0
		}
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const { data } = await supabase.from('smoothies').insert([
				{
					title: values.title,
					desc: values.description,
					rating: values.rating
				}
			]);

			await new Promise((resolve) => setTimeout(resolve, 1000));
			router.push('/');
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-8'>
				{formArr.map((item, index) => (
					<FormField
						key={index}
						control={form.control}
						name={item.name}
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{item.name.charAt(0).toUpperCase() + item.name.slice(1)}:
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='w-full'
										placeholder={item.placeholder}
										type={item.type}
										onChange={(e) => {
											const { value, type } = e.target;
											if (type === 'number') {
												field.onChange(Number(value));
											} else {
												field.onChange(value);
											}
										}}
										value={
											item.type === 'number' ? Number(field.value) : field.value
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<Button className='bg-customGreen' type='submit'>
					Create Smoothie Recipe
				</Button>
			</form>
		</Form>
	);
}
