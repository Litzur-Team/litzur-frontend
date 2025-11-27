'use client'

import { useState, useEffect } from 'react'
import { landingPageService, LandingPage, CreateLandingPageDTO, UpdateLandingPageDTO } from '@/services/landingPageService'
import { ApiError } from '@/types/api'

export function useLandingPages() {
	const [pages, setPages] = useState<LandingPage[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		loadPages()
	}, [])

	async function loadPages() {
		try {
			setIsLoading(true)
			setError(null)
			const data = await landingPageService.getAll()
			setPages(data)
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao carregar páginas')
		} finally {
			setIsLoading(false)
		}
	}

	async function createPage(data: CreateLandingPageDTO): Promise<LandingPage | null> {
		try {
			setError(null)
			const newPage = await landingPageService.create(data)
			setPages([...pages, newPage])
			return newPage
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao criar página')
			return null
		}
	}

	async function updatePage(id: string, data: UpdateLandingPageDTO): Promise<LandingPage | null> {
		try {
			setError(null)
			const updatedPage = await landingPageService.update(id, data)
			setPages(pages.map(p => p.id === id ? updatedPage : p))
			return updatedPage
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao atualizar página')
			return null
		}
	}

	async function deletePage(id: string): Promise<boolean> {
		try {
			setError(null)
			await landingPageService.delete(id)
			setPages(pages.filter(p => p.id !== id))
			return true
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao deletar página')
			return false
		}
	}

	async function publishPage(id: string): Promise<LandingPage | null> {
		try {
			setError(null)
			const updatedPage = await landingPageService.publish(id)
			setPages(pages.map(p => p.id === id ? updatedPage : p))
			return updatedPage
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao publicar página')
			return null
		}
	}

	async function unpublishPage(id: string): Promise<LandingPage | null> {
		try {
			setError(null)
			const updatedPage = await landingPageService.unpublish(id)
			setPages(pages.map(p => p.id === id ? updatedPage : p))
			return updatedPage
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao despublicar página')
			return null
		}
	}

	return {
		pages,
		isLoading,
		error,
		loadPages,
		createPage,
		updatePage,
		deletePage,
		publishPage,
		unpublishPage,
	}
}
