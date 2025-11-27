'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, LoginDTO, CreateUserDTO, ApiError } from '@/types/api'
import { authService } from '@/services/authService'
import { userService } from '@/services/userService'

interface AuthContextData {
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean
	login: (credentials: LoginDTO) => Promise<void>
	register: (userData: CreateUserDTO) => Promise<void>
	logout: () => void
	updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		loadUserFromToken()
	}, [])

	async function loadUserFromToken() {
		try {
			if (authService.isAuthenticated()) {
				// O token JWT geralmente contém informações do usuário
				// Vamos decodificar o token para obter os dados básicos
				const token = authService.getToken()
				if (token) {
					try {
						// Decodifica o payload do JWT (parte do meio)
						const payload = JSON.parse(atob(token.split('.')[1]))
						
						// Se o payload tiver as informações do usuário, use-as
						if (payload.id || payload.userId) {
							const userId = payload.id || payload.userId
							const userData = await userService.getById(userId)
							setUser(userData)
						} else {
							// Se não conseguir o ID do token, tenta buscar o perfil
							console.warn('Token não contém ID do usuário')
							setUser(null)
						}
					} catch (decodeError) {
						console.error('Erro ao decodificar token:', decodeError)
						authService.logout()
					}
				}
			}
		} catch (error) {
			console.error('Erro ao carregar usuário:', error)
			// Não faz logout aqui para não deslogar em caso de erro temporário
		} finally {
			setIsLoading(false)
		}
	}

	async function login(credentials: LoginDTO) {
		try {
			const response = await authService.login(credentials)
			
			// Se a resposta incluir o usuário, use-o
			if (response.user) {
				setUser(response.user)
			} else {
				// Caso contrário, busque os dados do usuário usando o token
				await loadUserFromToken()
			}
		} catch (error) {
			throw error
		}
	}

	async function register(userData: CreateUserDTO) {
		try {
			const response = await authService.register(userData)
			
			// Se a resposta incluir o usuário, use-o
			if (response.user) {
				setUser(response.user)
			} else {
				// Caso contrário, busque os dados do usuário usando o token
				await loadUserFromToken()
			}
		} catch (error) {
			throw error
		}
	}

	function logout() {
		setUser(null)
		authService.logout()
	}

	function updateUser(updatedUser: User) {
		setUser(updatedUser)
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isLoading,
				login,
				register,
				logout,
				updateUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider')
	}
	return context
}
