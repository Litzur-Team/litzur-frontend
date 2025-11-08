'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from '@/components/TextInput'
import Button from '@/components/Button'


const ForgotPasswordSchema = z.object({
	email: z.string().email('E-mail inválido'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>

export default function ForgotPasswordForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(ForgotPasswordSchema),
	})

	async function onSubmit(data: ForgotPasswordFormData) {
		console.log('Esqueceu senha data:', data)
	}

	return (
		<div className='flex w-full flex-col gap-8 sm:w-4/5 lg:w-1/2'>
			<h2 className='text-secondary-default text-lg font-semibold'>Recuperar Senha</h2>

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
						href='/emailcheck'
					>
						Enviar e-mail de verificação
					</Button>
					
				</div>
			</form>
		</div>
	)
}
