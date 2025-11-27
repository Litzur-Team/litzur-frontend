'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import TextInput from '@/components/TextInput'
import Button from '@/components/Button'
import { useAuth } from '@/contexts/AuthContext'
import { ApiError } from '@/types/api'

const signInSchema = z.object({
	email: z.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
	password: z.string().min(1, 'A senha é obrigatória').min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignInForm() {
	const router = useRouter()
	const { login } = useAuth()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
	})

	async function onSubmit(data: SignInFormData) {
		try {
			setErrorMessage(null)
			await login(data)
			toast.success('Login realizado com sucesso!')
			router.push('/dashboard')
		} catch (error) {
			const apiError = error as ApiError
			const errorMsg = apiError.message || 'Erro ao fazer login. Verifique suas credenciais.'
			setErrorMessage(errorMsg)
			toast.error(errorMsg)
		}
	}

	// Mostrar erros de validação
	const hasErrors = Object.keys(errors).length > 0
	if (hasErrors && !isSubmitting) {
		const firstError = Object.values(errors)[0]?.message
		if (firstError) {
			toast.error(firstError)
		}
	}

	return (
		<div className='flex w-full flex-col gap-8 sm:w-4/5 lg:w-1/2'>
			<h2 className='text-secondary-default text-lg font-semibold'>Entrar</h2>

			{errorMessage && (
				<div className='rounded-md bg-red-50 p-4 text-sm text-red-800'>
					{errorMessage}
				</div>
			)}

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
					href={'/forgotpassword'}
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
