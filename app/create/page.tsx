import CreateForm from '@/components/CreateForm';

export default function page() {
	return (
		<div className='pt-5 flex justify-center gap-4'>
			<div className='p-4 flex flex-col gap-4 bg-white min-w-96'>
				<CreateForm />
			</div>
		</div>
	);
}
