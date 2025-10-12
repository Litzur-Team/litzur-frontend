import Image from 'next/image'

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt-BR'>
			<body>
				<div className='flex h-screen w-screen'>
					<div className='flex h-screen w-full flex-col border border-gray-200 p-4 lg:w-1/2'>
						<div className='flex items-center gap-1'>
							<Image
								src='/images/litzur-logo.png'
								alt='Litzur logo'
								width={24}
								height={24}
							/>
							<Image
								src='/images/litzur-text-logo.svg'
								alt='Litzur logo'
								width={58}
								height={24}
							/>
						</div>
						<div className='flex flex-1 items-center justify-center'>
							{children}
						</div>
					</div>
					<div className='relative hidden lg:flex lg:w-1/2'>
						<Image
							src='/images/login-img.jpg'
							alt='The image captures a close-up of a person typing on a laptop keyboard'
							priority
							fill
							sizes='(max-width:  975px) 0vw, 50vw'
							className='h-full w-full object-cover'
						/>
					</div>
				</div>
			</body>
		</html>
	)
}
