'use client'

import { useForm, Controller } from 'react-hook-form'
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




const signUpSchema = z.object({
	name: z.string().min(1, 'O nome é obrigatório').min(2, 'O nome deve ter no mínimo 2 caracteres').regex(/^[^0-9]*$/, "O nome não pode conter números e símbolos"),
	email: z.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
	password: z.string().min(1, 'A senha é obrigatória').min(6, 'A senha deve ter no mínimo 6 caracteres'),
	telefone: z.string().min(1, 'O telefone é obrigatório').min(11, 'O telefone deve ter 11 dígitos').max(11, 'O telefone deve ter 11 dígitos'),
})

type SignUpFormData = z.infer<typeof signUpSchema>



export default function SignUpForm() {
	const router = useRouter()
	const { register: registerUser } = useAuth()
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
	})

	async function onSubmit(data: SignUpFormData) {
		try {
			setErrorMessage(null)
			await registerUser(data)
			toast.success('Conta criada com sucesso! Bem-vindo!')
			router.push('/dashboard')
		} catch (error) {
			const apiError = error as ApiError
			const errorMsg = apiError.message || 'Erro ao criar conta. Tente novamente.'
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
			<h2 className='text-secondary-default text-lg font-semibold'>Cadastre-se</h2>

			{errorMessage && (
				<div className='rounded-md bg-red-50 p-4 text-sm text-red-800'>
					{errorMessage}
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
				<TextInput
					label='Nome'
					type='text'
					id='name'
					placeholder='Digite seu Nome'
					required
					{...register('name')}
					error={errors.name?.message}
				/>
				
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

				
				<Controller
					name="telefone"
					control={control}
					render={({ field }) => {
						const formatPhone = (value: string) => {
							const digits = (value || '').replace(/\D/g, '').slice(0, 11)
							if (!digits) return ''
							if (digits.length <= 2) return `(${digits}`
							if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
							if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
							return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
						}

						return (
							<TextInput
								label="Telefone"
								type="tel"
								id="telefone"
								placeholder='(xx) xxxxx-xxxx'
								required
								value={formatPhone(field.value ?? '')}
								onChange={(e) => {
									const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 11)
									field.onChange(digits)
								}}
								error={errors.telefone?.message}
							/>
						)
					}}
				/>


				<div className='flex flex-col items-center gap-2'>
					<Button
						type='submit'
						icon='user-pen'
						iconSize={18}
						iconStrokeWidth={3}
						isLoading={isSubmitting}
					>
						Cadastrar-se
					</Button>
					<p className='text-secondary-light text-xs font-semibold'>
						Já tem uma Conta?{' '}
						<Link
							className='text-primary-default font-semibold transition duration-200 ease-in-out hover:font-bold hover:brightness-125'
							href={'/signin'}
						>
							Entrar
						</Link>
					</p>
				</div>
			</form>
		</div>
	)
}
