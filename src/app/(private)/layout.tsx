import Navbar from '@/components/Navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
	robots: 'noindex, nofollow',
}

export default function PrivateLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>{children}</main>
		</>
	)
}
