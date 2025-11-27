import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Acompanhe e gerencie suas páginas de forma eficiente.',
}

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <>{children}</>
}
