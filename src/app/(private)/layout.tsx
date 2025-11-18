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
		<html lang='pt-BR'>
			<body>
				<header>
					<Navbar />
				</header>
				<main>{children}</main>
			</body>
		</html>
	)
}
