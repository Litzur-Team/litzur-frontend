import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Acompanhe e gerencie suas páginas de forma eficiente.',
}

export default function DashboardSeo({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt-BR'>
			<body>
				<main>{children}</main>
			</body>
		</html>
	)
}
