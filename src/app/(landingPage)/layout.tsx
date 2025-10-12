export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt-BR'>
			<body>
				<h1>Landing Layout</h1>
        {children}
      </body>
		</html>
	)
}
