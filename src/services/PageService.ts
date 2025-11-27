import api from './api'
import { Page, CreatePageDTO, UpdatePageDTO, ApiError } from '@/types/api'
import { AxiosError } from 'axios'

export const pageService = {
	/**
	 * Busca todas as páginas do usuário autenticado
	 */
	async getAll(): Promise<Page[]> {
		try {
			const response = await api.get<Page[]>('/api/pages')
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Busca uma página por ID
	 */
	async getById(id: string): Promise<Page> {
		try {
			const response = await api.get<Page>(`/api/pages/${id}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Busca uma página por slug (pública)
	 */
	async getBySlug(slug: string): Promise<Page> {
		try {
			const response = await api.get<Page>(`/api/pages/slug/${slug}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Cria uma nova página
	 */
	async create(data: CreatePageDTO): Promise<Page> {
		try {
			const response = await api.post<Page>('/api/pages', data)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Atualiza uma página existente
	 */
	async update(id: string, data: UpdatePageDTO): Promise<Page> {
		try {
			const response = await api.put<Page>(`/api/pages/${id}`, data)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Deleta uma página
	 */
	async delete(id: string): Promise<void> {
		try {
			await api.delete(`/api/pages/${id}`)
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Publica uma página (torna pública)
	 */
	async publish(id: string): Promise<Page> {
		try {
			const response = await api.patch<Page>(`/api/pages/${id}/publish`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Despublica uma página (torna privada)
	 */
	async unpublish(id: string): Promise<Page> {
		try {
			const response = await api.patch<Page>(`/api/pages/${id}/unpublish`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Duplica uma página existente
	 */
	async duplicate(id: string): Promise<Page> {
		try {
			const response = await api.post<Page>(`/api/pages/${id}/duplicate`)
			return response.data
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
