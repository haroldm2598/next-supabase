'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'title must be at least 2 characters.'
	}),
	desc: z.string().min(2, {
		message: 'description is required'
	}),
	rating: z.string().min(1, {
		message: 'rating is required'
	})
});

export default function CreateForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			desc: '',
			rating: ''
		}
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className=' space-y-8'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title:</FormLabel>
							<FormControl>
								<Input placeholder='shadcn' className='w-full' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='desc'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description:</FormLabel>
							<FormControl>
								<Input placeholder='shadcn' className='w-full' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='rating'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rating:</FormLabel>
							<FormControl>
								<Input placeholder='shadcn' className='w-full' {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='bg-customGreen' type='submit'>
					Create Smoothie Recipe
				</Button>
			</form>
		</Form>
	);
}
