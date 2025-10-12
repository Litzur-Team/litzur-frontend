import SignInForm from '@/components/forms/SignInForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Entrar',
	description: 'Acesse sua conta Litzur com e-mail e senha.',
}

export default function SignIn() {
	return <SignInForm />
}
