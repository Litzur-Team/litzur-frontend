import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'

export default function LandingPage() {
	return (
		<div className='min-h-screen'>
			{/* Header */}
			<header className='border-b border-surface-secondary-default bg-white'>
				<nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8'>
					<div className='flex items-center gap-2'>
						<Image
							src='/images/litzur-logo.png'
							alt='Litzur'
							width={40}
							height={40}
							className='h-10 w-auto'
						/>
						<span className='text-xl font-bold text-secondary-default'>Litzur</span>
					</div>
					<div className='flex items-center gap-4'>
						<Link
							href='/signin'
							className='text-sm font-medium text-secondary-default transition hover:text-primary-default'
						>
							Entrar
						</Link>
						<Link
							href='/signup'
							className='rounded-lg bg-primary-default px-4 py-2 text-sm font-semibold text-white transition hover:brightness-125'
						>
							Começar grátis
						</Link>
					</div>
				</nav>
			</header>

			{/* Hero Section */}
			<section className='mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32'>
				<div className='text-center'>
					<h1 className='text-4xl font-bold tracking-tight text-secondary-darker sm:text-6xl'>
						Crie páginas web incríveis
						<br />
						<span className='text-primary-default'>sem escrever código</span>
					</h1>
					<p className='mx-auto mt-6 max-w-2xl text-lg text-secondary-default'>
						Litzur é a plataforma que transforma suas ideias em páginas web profissionais.
						Editor visual intuitivo, templates modernos e publicação instantânea.
					</p>
					<div className='mt-10 flex items-center justify-center gap-4'>
						<Button href='/signup' className='w-auto md:w-max px-8'>
							Criar minha primeira página
						</Button>
						<Link
							href='/signin'
							className='rounded-lg border border-surface-secondary-default px-8 py-3 text-sm font-semibold text-secondary-default transition hover:bg-surface-secondary-lighter'
						>
							Ver demonstração
						</Link>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className='bg-surface-secondary-lighter py-24'>
				<div className='mx-auto max-w-7xl px-6 lg:px-8'>
					<div className='mb-16 text-center'>
						<h2 className='text-3xl font-bold text-secondary-darker'>
							Tudo que você precisa para criar
						</h2>
						<p className='mt-4 text-lg text-secondary-default'>
							Ferramentas poderosas em uma interface simples
						</p>
					</div>

					<div className='grid gap-8 md:grid-cols-3'>
						<div className='rounded-xl bg-white p-8 shadow-sm'>
							<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-lighter'>
								<svg
									className='h-6 w-6 text-primary-default'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
									/>
								</svg>
							</div>
							<h3 className='mb-2 text-xl font-semibold text-secondary-darker'>
								Editor Visual
							</h3>
							<p className='text-secondary-default'>
								Arraste, solte e personalize elementos em tempo real. Veja suas alterações
								instantaneamente.
							</p>
						</div>

						<div className='rounded-xl bg-white p-8 shadow-sm'>
							<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-lighter'>
								<svg
									className='h-6 w-6 text-primary-default'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'
									/>
								</svg>
							</div>
							<h3 className='mb-2 text-xl font-semibold text-secondary-darker'>
								Templates Prontos
							</h3>
							<p className='text-secondary-default'>
								Escolha entre dezenas de templates profissionais e personalize para seu estilo.
							</p>
						</div>

						<div className='rounded-xl bg-white p-8 shadow-sm'>
							<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-lighter'>
								<svg
									className='h-6 w-6 text-primary-default'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M13 10V3L4 14h7v7l9-11h-7z'
									/>
								</svg>
							</div>
							<h3 className='mb-2 text-xl font-semibold text-secondary-darker'>
								Publicação Rápida
							</h3>
							<p className='text-secondary-default'>
								Publique sua página com um clique. Compartilhe com o mundo em segundos.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-24'>
				<div className='mx-auto max-w-4xl px-6 text-center lg:px-8'>
					<h2 className='text-3xl font-bold text-secondary-darker sm:text-4xl'>
						Pronto para começar?
					</h2>
					<p className='mt-4 text-lg text-secondary-default'>
						Comece agora a usar o Litzur e dê vida às suas ideias!
					</p>
					<div className='mt-8'>
						<Button href='/signup' className='w-auto px-8'>
							Criar conta gratuita
						</Button>
					</div>
					<p className='mt-4 text-sm text-secondary-light'>
						Não é necessário cartão de crédito
					</p>
				</div>
			</section>

			{/* Footer */}
			<footer className='border-t border-surface-secondary-default bg-white'>
				<div className='mx-auto max-w-7xl px-6 py-12 lg:px-8'>
					<div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
						<div className='flex items-center gap-2'>
							<Image
								src='/images/litzur-logo.png'
								alt='Litzur'
								width={32}
								height={32}
								className='h-8 w-auto'
							/>
							<span className='font-semibold text-secondary-darker'>Litzur</span>
						</div>
						<p className='text-sm text-secondary-light'>
							© {new Date().getFullYear()} Litzur. Todos os direitos reservados.
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
