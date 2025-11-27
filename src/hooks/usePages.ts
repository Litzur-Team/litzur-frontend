'use client'

import { useState, useEffect } from 'react'
import { pageService } from '@/services/pageService'
import { Page, CreatePageDTO, UpdatePageDTO, ApiError } from '@/types/api'

export function usePages() {
	const [pages, setPages] = useState<Page[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		loadPages()
	}, [])

	async function loadPages() {
		try {
			setIsLoading(true)
			setError(null)
			const data = await pageService.getAll()
			setPages(data)
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao carregar páginas')
		} finally {
			setIsLoading(false)
		}
	}

	async function createPage(data: CreatePageDTO): Promise<Page | null> {
		try {
			setError(null)
			const newPage = await pageService.create(data)
			setPages([...pages, newPage])
			return newPage
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao criar página')
			return null
		}
	}

	async function updatePage(id: string, data: UpdatePageDTO): Promise<Page | null> {
		try {
			setError(null)
			const updatedPage = await pageService.update(id, data)
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
			await pageService.delete(id)
			setPages(pages.filter(p => p.id !== id))
			return true
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao deletar página')
			return false
		}
	}

	async function publishPage(id: string): Promise<Page | null> {
		try {
			setError(null)
			const updatedPage = await pageService.publish(id)
			setPages(pages.map(p => p.id === id ? updatedPage : p))
			return updatedPage
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao publicar página')
			return null
		}
	}

	async function unpublishPage(id: string): Promise<Page | null> {
		try {
			setError(null)
			const updatedPage = await pageService.unpublish(id)
			setPages(pages.map(p => p.id === id ? updatedPage : p))
			return updatedPage
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao despublicar página')
			return null
		}
	}

	async function duplicatePage(id: string): Promise<Page | null> {
		try {
			setError(null)
			const duplicated = await pageService.duplicate(id)
			setPages([...pages, duplicated])
			return duplicated
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao duplicar página')
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
		duplicatePage,
	}
}
