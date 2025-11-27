'use client'

import { useState, useEffect } from 'react'
import { leadService, Lead, CreateLeadDTO, UpdateLeadDTO } from '@/services/leadService'
import { ApiError } from '@/types/api'

export function useLeads(pageId?: string) {
	const [leads, setLeads] = useState<Lead[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (pageId) {
			loadLeadsByPage(pageId)
		} else {
			loadAllLeads()
		}
	}, [pageId])

	async function loadAllLeads() {
		try {
			setIsLoading(true)
			setError(null)
			const data = await leadService.getAll()
			setLeads(data)
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao carregar leads')
		} finally {
			setIsLoading(false)
		}
	}

	async function loadLeadsByPage(pageId: string) {
		try {
			setIsLoading(true)
			setError(null)
			const data = await leadService.getByPageId(pageId)
			setLeads(data)
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao carregar leads')
		} finally {
			setIsLoading(false)
		}
	}

	async function createLead(data: CreateLeadDTO): Promise<Lead | null> {
		try {
			setError(null)
			const newLead = await leadService.create(data)
			setLeads([...leads, newLead])
			return newLead
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao criar lead')
			return null
		}
	}

	async function updateLead(id: string, data: UpdateLeadDTO): Promise<Lead | null> {
		try {
			setError(null)
			const updatedLead = await leadService.update(id, data)
			setLeads(leads.map(l => l.id === id ? updatedLead : l))
			return updatedLead
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao atualizar lead')
			return null
		}
	}

	async function deleteLead(id: string): Promise<boolean> {
		try {
			setError(null)
			await leadService.delete(id)
			setLeads(leads.filter(l => l.id !== id))
			return true
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao deletar lead')
			return false
		}
	}

	async function searchByEmail(email: string): Promise<Lead[]> {
		try {
			setError(null)
			const results = await leadService.searchByEmail(email)
			return results
		} catch (error) {
			const apiError = error as ApiError
			setError(apiError.message || 'Erro ao buscar leads')
			return []
		}
	}

	return {
		leads,
		isLoading,
		error,
		loadAllLeads,
		loadLeadsByPage,
		createLead,
		updateLead,
		deleteLead,
		searchByEmail,
	}
}
