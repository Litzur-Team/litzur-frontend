import '@/app/globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
		default: 'Litzur | Crie sua página web',
		template: '%s | Litzur',
	},
  description: 'Plataforma inteligente para criação de páginas web.',
  keywords: ['web', 'pagina', 'layout', 'litzur'],
  authors: [{ name: 'Litzur', url: 'https://litzur.com' }],
  metadataBase: new URL('https://litzur.com'),
  icons: {
    icon: '/images/litzur-logo.png',
		shortcut: '/images/litzur-logo.png',
		apple: '/images/litzur-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Litzur',
    url: 'https://litzur.com',
    title: 'Litzur',
    description: 'Crie páginas web com praticidade.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Litzur',
    description: 'Crie páginas web com facilidade.',
    creator: '@litzur',
  },
  robots: 'index, follow',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt-BR'>
			<body>{children}</body>
		</html>
	)
}
