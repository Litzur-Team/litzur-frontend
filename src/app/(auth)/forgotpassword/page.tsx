import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Recuperar Senha',
	description: 'Recupere sua senha.',
}

export default function ForgotPassword() {
	return <ForgotPasswordForm/>
}
