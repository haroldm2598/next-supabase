import Link from 'next/link';

const navLink = [
	{ name: 'Home', href: '/' },
	{ name: 'Create New Smoothie', href: '/create' }
];

export default function Navbar() {
	return (
		<nav className='py-4 flex flex-col items-center gap-4'>
			<h1 className='text-xl text-white font-bold'>Supa Smoothies</h1>

			<ul className='flex space-x-2'>
				{navLink.map((item, index) => {
					return (
						<li key={index} className='text-white underline'>
							<Link href={item.href}>{item.name}</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
