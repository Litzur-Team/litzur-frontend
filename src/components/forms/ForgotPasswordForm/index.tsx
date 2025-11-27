'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import toast from 'react-hot-toast'
import TextInput from '@/components/TextInput'
import Button from '@/components/Button'
import { authService } from '@/services/authService'
import { ApiError } from '@/types/api'


const ForgotPasswordSchema = z.object({
	email: z.string().email('E-mail inválido'),
})

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPasswordForm() {
	const [successMessage, setSuccessMessage] = useState<string | null>(null)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(ForgotPasswordSchema),
	})

	async function onSubmit(data: ForgotPasswordFormData) {
		try {
			setErrorMessage(null)
			setSuccessMessage(null)
			await authService.forgotPassword(data.email)
			const successMsg = 'E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.'
			setSuccessMessage(successMsg)
			toast.success(successMsg)
		} catch (error) {
			const apiError = error as ApiError
			const errorMsg = apiError.message || 'Erro ao enviar e-mail. Tente novamente.'
			setErrorMessage(errorMsg)
			toast.error(errorMsg)
		}
	}

	return (
		<div className='flex w-full flex-col gap-8 sm:w-4/5 lg:w-1/2'>
			<h2 className='text-secondary-default text-lg font-semibold'>Recuperar Senha</h2>

			{successMessage && (
				<div className='rounded-md bg-green-50 p-4 text-sm text-green-800'>
					{successMessage}
				</div>
			)}

			{errorMessage && (
				<div className='rounded-md bg-red-50 p-4 text-sm text-red-800'>
					{errorMessage}
				</div>
			)}

			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
				<TextInput
					label='E-mail de cadastro'
					type='email'
					id='email'
					placeholder='Digite seu E-Mail'
					required
					{...register('email')}
					error={errors.email?.message}
				/>


				<div className='flex flex-col items-center gap-2'>
					<Button
						type='submit'
						icon='mail-check'
						iconSize={18}
						iconStrokeWidth={3}
						isLoading={isSubmitting}
					>
						Enviar e-mail de verificação
					</Button>
					
				</div>
			</form>
		</div>
	)
}
