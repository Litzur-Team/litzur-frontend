import EmailCheckForm from '@/components/forms/EmailCheckForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Inserir Código',
	description: 'Insira o código de vrificação.',
}

export default function EmailCheck() {
	return <EmailCheckForm/>
}
