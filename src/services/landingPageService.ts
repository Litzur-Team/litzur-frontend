import api from './api'
import { ApiError } from '@/types/api'
import { AxiosError } from 'axios'

export interface LandingPage {
	id: string
	title: string
	slug: string
	content?: any
	isPublished?: boolean
	userId: string
	createdAt: string
	updatedAt: string
}

export interface CreateLandingPageDTO {
	title: string
	slug?: string
	content?: any
}

export interface UpdateLandingPageDTO {
	title?: string
	slug?: string
	content?: any
	isPublished?: boolean
}

export const landingPageService = {
	/**
	 * Busca todas as landing pages do usuário autenticado
	 */
	async getAll(): Promise<LandingPage[]> {
		try {
			const response = await api.get<LandingPage[]>('/api/landing-pages')
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Busca landing pages de um usuário específico
	 */
	async getByUserId(userId: string): Promise<LandingPage[]> {
		try {
			const response = await api.get<LandingPage[]>(`/api/landing-pages/user/${userId}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Busca uma landing page por ID
	 */
	async getById(id: string): Promise<LandingPage> {
		try {
			const response = await api.get<LandingPage>(`/api/landing-pages/${id}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Busca uma landing page por slug (pública)
	 */
	async getBySlug(slug: string): Promise<LandingPage> {
		try {
			const response = await api.get<LandingPage>(`/api/landing-pages/slug/${slug}`)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Cria uma nova landing page
	 */
	async create(data: CreateLandingPageDTO): Promise<LandingPage> {
		try {
			const response = await api.post<LandingPage>('/api/landing-pages', data)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Atualiza uma landing page existente
	 */
	async update(id: string, data: UpdateLandingPageDTO): Promise<LandingPage> {
		try {
			const response = await api.put<LandingPage>(`/api/landing-pages/${id}`, data)
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Deleta uma landing page
	 */
	async delete(id: string): Promise<void> {
		try {
			await api.delete(`/api/landing-pages/${id}`)
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Publica uma landing page (torna pública)
	 */
	async publish(id: string): Promise<LandingPage> {
		try {
			const response = await api.put<LandingPage>(`/api/landing-pages/${id}`, {
				isPublished: true
			})
			return response.data
		} catch (error) {
			throw this.handleError(error)
		}
	},

	/**
	 * Despublica uma landing page (torna privada)
	 */
	async unpublish(id: string): Promise<LandingPage> {
		try {
			const response = await api.put<LandingPage>(`/api/landing-pages/${id}`, {
				isPublished: false
			})
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
