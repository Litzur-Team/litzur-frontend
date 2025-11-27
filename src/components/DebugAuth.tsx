'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'

export default function DebugAuth() {
	const { user, isLoading, isAuthenticated } = useAuth()

	useEffect(() => {
		console.log('=== DEBUG AUTH ===')
		console.log('isLoading:', isLoading)
		console.log('isAuthenticated:', isAuthenticated)
		console.log('user:', user)
		console.log('token:', localStorage.getItem('authToken'))
		
		// Tenta decodificar o token
		const token = localStorage.getItem('authToken')
		if (token) {
			try {
				const payload = JSON.parse(atob(token.split('.')[1]))
				console.log('Token payload:', payload)
			} catch (e) {
				console.error('Erro ao decodificar token:', e)
			}
		}
		console.log('==================')
	}, [user, isLoading, isAuthenticated])

	return null
}
