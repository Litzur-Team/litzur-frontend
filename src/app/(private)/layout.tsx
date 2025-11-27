import Navbar from '@/components/Navbar'
import ProtectedRoute from '@/components/ProtectedRoute'
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
		<ProtectedRoute>
			<header>
				<Navbar />
			</header>
			<main>{children}</main>
		</ProtectedRoute>
	)
}
