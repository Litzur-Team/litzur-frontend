import api from './api'
import { ApiError } from '@/types/api'
import { AxiosError } from 'axios'

export interface Lead {
	id: string
	name: string
	email: string
	phone?: string
	message?: string
	pageId: string
	createdAt: string
	updatedAt: string
}

export interface CreateLeadDTO {
	name: string
	email: string
	phone?: string
	message?: string
	pageId: string
}

export interface UpdateLeadDTO {
	name?: string
	email?: string
	phone?: string
	message?: string
}

export const leadService = {
	/**
	 * Busca todos os leads
	 */
	async getAll(): Promise<Lead[]> {
		try {
			const response = await api.get<Lead[]>('/api/leads')
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Busca um lead por ID
	 */
	async getById(id: string): Promise<Lead> {
		try {
			const response = await api.get<Lead>(`/api/leads/${id}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Busca leads de uma landing page específica
	 */
	async getByPageId(pageId: string): Promise<Lead[]> {
		try {
			const response = await api.get<Lead[]>(`/api/leads/page/${pageId}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Busca leads por email
	 */
	async searchByEmail(email: string): Promise<Lead[]> {
		try {
			const response = await api.get<Lead[]>(`/api/leads/search?email=${encodeURIComponent(email)}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Cria um novo lead (rota pública)
	 */
	async create(data: CreateLeadDTO): Promise<Lead> {
		try {
			const response = await api.post<Lead>('/api/leads', data)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Atualiza um lead
	 */
	async update(id: string, data: UpdateLeadDTO): Promise<Lead> {
		try {
			const response = await api.put<Lead>(`/api/leads/${id}`, data)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Deleta um lead
	 */
	async delete(id: string): Promise<void> {
		try {
			await api.delete(`/api/leads/${id}`)
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
