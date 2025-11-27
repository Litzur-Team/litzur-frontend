// Exemplo de como usar os serviços no Dashboard
// Este arquivo serve como referência para integrar o pageService

import { pageService } from '@/services/PageService'
import { Page } from '@/types/api'

// Exemplo 1: Carregar páginas no dashboard
async function loadPages() {
	try {
		const pages = await pageService.getAll()
		console.log('Páginas carregadas:', pages)
		// Atualizar estado do componente com as páginas
		// setPages(pages)
	} catch (error) {
		console.error('Erro ao carregar páginas:', error)
	}
}

// Exemplo 2: Criar nova página
async function createNewPage(title: string) {
	try {
		const newPage = await pageService.create({
			title,
			slug: title.toLowerCase().replace(/\s+/g, '-'),
			content: {},
		})
		console.log('Página criada:', newPage)
		// Adicionar página à lista
		// setPages([...pages, newPage])
	} catch (error) {
		console.error('Erro ao criar página:', error)
	}
}

// Exemplo 3: Deletar página
async function deletePage(id: string) {
	try {
		await pageService.delete(id)
		console.log('Página deletada')
		// Remover página da lista
		// setPages(pages.filter(p => p.id !== id))
	} catch (error) {
		console.error('Erro ao deletar página:', error)
	}
}

// Exemplo 4: Publicar/Despublicar página
async function togglePublish(page: Page) {
	try {
		if (page.isPublished) {
			await pageService.unpublish(page.id)
		} else {
			await pageService.publish(page.id)
		}
		console.log('Status de publicação atualizado')
		// Atualizar página na lista
		// setPages(pages.map(p => p.id === page.id ? { ...p, isPublished: !p.isPublished } : p))
	} catch (error) {
		console.error('Erro ao atualizar publicação:', error)
	}
}

// Exemplo 5: Duplicar página
async function duplicatePage(id: string) {
	try {
		const duplicated = await pageService.duplicate(id)
		console.log('Página duplicada:', duplicated)
		// Adicionar página duplicada à lista
		// setPages([...pages, duplicated])
	} catch (error) {
		console.error('Erro ao duplicar página:', error)
	}
}

// Exemplo 6: Atualizar página no editor
async function savePage(id: string, content: any) {
	try {
		const updated = await pageService.update(id, {
			content,
		})
		console.log('Página salva:', updated)
	} catch (error) {
		console.error('Erro ao salvar página:', error)
	}
}

// Exemplo de componente React com hooks
/*
'use client'

import { useState, useEffect } from 'react'
import { pageService } from '@/services/PageService'
import { Page, ApiError } from '@/types/api'

export default function MyDashboard() {
	const [pages, setPages] = useState<Page[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		loadPages()
	}, [])

	async function loadPages() {
		try {
			setIsLoading(true)
			const data = await pageService.getAll()
			setPages(data)
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message)
		} finally {
			setIsLoading(false)
		}
	}

	async function handleDelete(id: string) {
		try {
			await pageService.delete(id)
			setPages(pages.filter(p => p.id !== id))
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message)
		}
	}

	if (isLoading) return <div>Carregando...</div>
	if (error) return <div>Erro: {error}</div>

	return (
		<div>
			{pages.map(page => (
				<div key={page.id}>
					<h3>{page.title}</h3>
					<button onClick={() => handleDelete(page.id)}>Deletar</button>
				</div>
			))}
		</div>
	)
}
*/
