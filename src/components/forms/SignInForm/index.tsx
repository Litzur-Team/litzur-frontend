'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import TextInput from '@/components/TextInput'
import Button from '@/components/Button'

const signInSchema = z.object({
	email: z.string().email('E-mail inválido'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignInForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
	})

	async function onSubmit(data: SignInFormData) {
		console.log('Login data:', data)
	}

	return (
		<div className='flex w-full flex-col gap-8 sm:w-4/5 lg:w-1/2'>
			<h2 className='text-secondary-default text-lg font-semibold'>Entrar</h2>

			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
				<TextInput
					label='E-mail'
					type='email'
					id='email'
					placeholder='Digite seu E-Mail'
					required
					{...register('email')}
					error={errors.email?.message}
				/>

				<TextInput
					label='Senha'
					type='password'
					id='password'
					placeholder='Digite sua senha'
					required
					{...register('password')}
					error={errors.password?.message}
				/>

				<Link
					className='text-primary-default w-fit text-xs transition duration-200 ease-in-out hover:font-semibold hover:brightness-125'
					href={'#'}
				>
					Esqueci minha senha
				</Link>

				<div className='flex flex-col items-center gap-2'>
					<Button
						type='submit'
						icon='log-in'
						iconSize={18}
						iconStrokeWidth={3}
						isLoading={isSubmitting}
					>
						Entrar
					</Button>
					<p className='text-secondary-light text-xs font-semibold'>
						Não tem uma conta?{' '}
						<Link
							className='text-primary-default font-semibold transition duration-200 ease-in-out hover:font-bold hover:brightness-125'
							href={'/signup'}
						>
							Cadastre-se
						</Link>
					</p>
				</div>
			</form>
		</div>
	)
}
