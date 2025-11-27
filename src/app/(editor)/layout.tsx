import ProtectedRoute from '@/components/ProtectedRoute'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Editor de Página',
	description: 'Crie e edite suas páginas web facilmente com nosso editor visual intuitivo.',
}

export default function EditorLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <ProtectedRoute>{children}</ProtectedRoute>
}
