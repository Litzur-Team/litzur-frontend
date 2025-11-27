import api from './api'
import { LoginDTO, LoginResponse, CreateUserDTO, ApiError } from '@/types/api'
import { AxiosError } from 'axios'

export const authService = {
	/**
	 * Realiza login do usuário
	 */
	async login(credentials: LoginDTO): Promise<LoginResponse> {
		try {
			const response = await api.post<LoginResponse>('/api/login', credentials)
			
			// Armazena o token no localStorage
			if (response.data.token) {
				localStorage.setItem('authToken', response.data.token)
			}
			
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Realiza cadastro de novo usuário
	 */
	async register(userData: CreateUserDTO): Promise<LoginResponse> {
		try {
			// Cria o usuário
			const response = await api.post('/api/users', userData)
			
			// Tenta fazer login automaticamente
			if (userData.email && userData.password) {
				return await this.login({
					email: userData.email,
					password: userData.password
				})
			}
			
			// Se não conseguir fazer login automaticamente, retorna os dados do usuário
			return {
				user: response.data,
				token: ''
			}
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Realiza logout do usuário
	 */
	logout(): void {
		localStorage.removeItem('authToken')
		if (typeof window !== 'undefined') {
			window.location.href = '/signin'
		}
	},

	/**
	 * Verifica se o usuário está autenticado
	 */
	isAuthenticated(): boolean {
		if (typeof window === 'undefined') return false
		return !!localStorage.getItem('authToken')
	},

	/**
	 * Obtém o token de autenticação
	 */
	getToken(): string | null {
		if (typeof window === 'undefined') return null
		return localStorage.getItem('authToken')
	},

	/**
	 * Solicita recuperação de senha
	 */
	async forgotPassword(email: string): Promise<void> {
		try {
			await api.post('/api/auth/forgot-password', { email })
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Reseta a senha com token
	 */
	async resetPassword(token: string, newPassword: string): Promise<void> {
		try {
			await api.post('/api/auth/reset-password', { token, password: newPassword })
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Trata erros da API
	 */
	handleError(error: unknown): ApiError {
		if (error instanceof AxiosError) {
			const message = error.response?.data?.message || error.message || 'Erro ao processar requisição'
			return {
				message,
				status: error.response?.status,
				errors: error.response?.data?.errors,
			}
		}
		return {
			message: 'Erro desconhecido',
		}
	},
}
