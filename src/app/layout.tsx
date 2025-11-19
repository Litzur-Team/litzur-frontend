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
      <head>
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `((c,l,a,r,i,t,y)=>{c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "u8n4xlxe52");`
          }}
        />
      </head>
      <body>{children}</body>
    </html>
	)
}
