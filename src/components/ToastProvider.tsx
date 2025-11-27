'use client'

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
	return (
		<Toaster
			position="top-right"
			reverseOrder={false}
			gutter={8}
			toastOptions={{
				// Configurações padrão para todos os toasts
				duration: 4000,
				style: {
					background: '#363636',
					color: '#fff',
					padding: '16px',
					borderRadius: '8px',
					fontSize: '14px',
				},
				// Estilos para sucesso
				success: {
					duration: 3000,
					iconTheme: {
						primary: '#10b981',
						secondary: '#fff',
					},
					style: {
						background: '#fff',
						color: '#065f46',
						border: '1px solid #10b981',
					},
				},
				// Estilos para erro
				error: {
					duration: 4000,
					iconTheme: {
						primary: '#ef4444',
						secondary: '#fff',
					},
					style: {
						background: '#fff',
						color: '#991b1b',
						border: '1px solid #ef4444',
					},
				},
				// Estilos para loading
				loading: {
					style: {
						background: '#fff',
						color: '#1f2937',
						border: '1px solid #3b82f6',
					},
				},
			}}
		/>
	)
}
