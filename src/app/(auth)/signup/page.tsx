import SignUpForm from '@/components/forms/SignUpForm'
import SignInForm from '@/components/forms/SignUpForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Cadastrar-se',
	description: 'Cadastre-se em nossa plataforma.',
}

export default function SignUp() {
	return <SignUpForm/>
}
