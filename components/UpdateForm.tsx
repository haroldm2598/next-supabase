'use client';
import supabase from '@/config/supabaseClient';
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

import { formArr, formSchema } from '@/lib/formSchema';

interface UpdateFormProps {
	id?: number;
	title: string;
	desc: string;
	rating: number;
}

export default function UpdateForm({
	id,
	title,
	desc,
	rating
}: UpdateFormProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: title,
			description: desc,
			rating: rating
		}
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const { data } = await supabase
				.from('smoothies')
				.update([
					{
						title: values.title,
						desc: values.description,
						rating: values.rating
					}
				])
				.eq('id', id)
				.select();

			console.log(data);
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
					Update Smoothie Recipe
				</Button>
			</form>
		</Form>
	);
}
