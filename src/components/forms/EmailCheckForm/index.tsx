'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import TextInput from '@/components/TextInput'
import Button from '@/components/Button'

const EmailCheckSchema = z.object({
	email: z.string().email('E-mail inválido'),
	password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type EmailCheckFormData = z.infer<typeof EmailCheckSchema>

export default function ForgotPasswordForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<EmailCheckFormData>({
		resolver: zodResolver(EmailCheckSchema),
	})

	async function onSubmit(data: EmailCheckFormData) {
		console.log('Email Check data:', data)
	}

	return (
		<div className='flex w-full flex-col gap-8 sm:w-4/5 lg:w-1/2'>
			<h2 className='text-secondary-default text-lg font-semibold'>Verificar e-mail</h2>

			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
				<TextInput
					label='Código de verificação'
					type='email'
					id='email'
					placeholder='Digite o código de verificação'
					required
					{...register('email')}
					error={errors.email?.message}
				/>


				<div className='flex flex-col items-center gap-2'>
					<Button
						type='submit'
						icon='check-check'
						iconSize={18}
						iconStrokeWidth={3}
						isLoading={isSubmitting}
					>
						Verificar código
					</Button>
					
				</div>
			</form>
		</div>
	)
}
