import api from './api'
import { User, UpdateUserDTO, ApiError } from '@/types/api'
import { AxiosError } from 'axios'

export const userService = {
	/**
	 * Busca todos os usuários
	 */
	async getAll(): Promise<User[]> {
		try {
			const response = await api.get<User[]>('/api/users')
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Busca um usuário por ID
	 */
	async getById(id: string): Promise<User> {
		try {
			const response = await api.get<User>(`/api/users/${id}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Busca o perfil do usuário autenticado
	 */
	async getProfile(): Promise<User> {
		try {
			const response = await api.get<User>('/api/users/profile')
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Atualiza um usuário
	 */
	async update(id: string, data: UpdateUserDTO): Promise<User> {
		try {
			const response = await api.put<User>(`/api/users/${id}`, data)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Atualiza o perfil do usuário autenticado
	 */
	async updateProfile(data: UpdateUserDTO): Promise<User> {
		try {
			const response = await api.put<User>('/api/users/profile', data)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Deleta um usuário
	 */
	async delete(id: string): Promise<void> {
		try {
			await api.delete(`/api/users/${id}`)
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
