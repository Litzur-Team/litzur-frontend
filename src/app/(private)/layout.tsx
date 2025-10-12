import { Metadata } from "next"

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
        <h1>Private</h1>
        {children}
      </body>
		</html>
	)
}
