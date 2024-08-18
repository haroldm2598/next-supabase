import { z } from 'zod';

type FormFieldNames = 'title' | 'description' | 'rating';

export const formSchema = z.object({
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

export const formArr: {
	name: FormFieldNames;
	placeholder: string;
	type: string;
}[] = [
	{ name: 'title', placeholder: 'enter a title', type: 'text' },
	{ name: 'description', placeholder: 'enter a description', type: 'text' },
	{ name: 'rating', placeholder: 'enter a rating', type: 'number' }
];
