'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

import DashboardToolbar from './components/DashboardToolbar'
import PageGrid from './components/PageGrid'
import PageList from './components/PageList'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import StatsOverview from './components/StatsOverview'

interface PageType {
	id: string | number
	title: string
	thumbnail: string
	status: 'published' | 'draft' | 'scheduled'
	lastModified: Date
	views: number
	conversions: number
	conversionRate: number
	template: string
}

interface DeleteModalState {
	isOpen: boolean
	pageId: string | number | null
	pageTitle: string
	isMultiple: boolean
}

export default function Dashboard() {
	const router = useRouter()

	// State management
	const [viewMode, setViewMode] = useState<string>('grid')
	const [sortBy, setSortBy] = useState<string>('lastModified')
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
	const [filterStatus, setFilterStatus] = useState<string>('all')
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [selectedPages, setSelectedPages] = useState<(string | number)[]>([])
	const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
		isOpen: false,
		pageId: null,
		pageTitle: '',
		isMultiple: false,
	})
	const [isDeleting, setIsDeleting] = useState<boolean>(false)

	// Mock data
	const [pages, setPages] = useState<PageType[]>([
		{
			id: 1,
			title: 'Página de Vendas - Produto Premium',
			thumbnail:
				'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
			status: 'published',
			lastModified: new Date(2024, 7, 20, 14, 30),
			views: 15420,
			conversions: 892,
			conversionRate: 5.8,
			template: 'Landing Page',
		},
		{
			id: 2,
			title: 'Newsletter Signup - Marketing Digital',
			thumbnail:
				'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop',
			status: 'draft',
			lastModified: new Date(2024, 7, 22, 9, 15),
			views: 0,
			conversions: 0,
			conversionRate: 0,
			template: 'Newsletter',
		},
		{
			id: 3,
			title: 'Webinar - Estratégias de Crescimento',
			thumbnail:
				'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
			status: 'scheduled',
			lastModified: new Date(2024, 7, 21, 16, 45),
			views: 3240,
			conversions: 156,
			conversionRate: 4.8,
			template: 'Event Page',
		},
		{
			id: 4,
			title: 'Página Institucional - Sobre Nós',
			thumbnail:
				'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
			status: 'published',
			lastModified: new Date(2024, 7, 18, 11, 20),
			views: 8750,
			conversions: 245,
			conversionRate: 2.8,
			template: 'Corporate',
		},
		{
			id: 5,
			title: 'Catálogo de Produtos 2024',
			thumbnail:
				'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
			status: 'draft',
			lastModified: new Date(2024, 7, 19, 13, 10),
			views: 0,
			conversions: 0,
			conversionRate: 0,
			template: 'Catalog',
		},
		{
			id: 6,
			title: 'Formulário de Contato - Suporte',
			thumbnail:
				'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=400&h=300&fit=crop',
			status: 'published',
			lastModified: new Date(2024, 7, 17, 8, 30),
			views: 12300,
			conversions: 1840,
			conversionRate: 15.0,
			template: 'Contact Form',
		},
	])

	// Computed stats
	const stats = useMemo(() => {
		const totalPages = pages?.length
		const publishedPages = pages?.filter(
			(p) => p?.status === 'published'
		)?.length
		const draftPages = pages?.filter((p) => p?.status === 'draft')?.length
		const totalViews = pages?.reduce((sum, page) => sum + page?.views, 0)

		return {
			totalPages,
			publishedPages,
			draftPages,
			totalViews,
		}
	}, [pages])

	// Filtered and sorted pages
	const filteredAndSortedPages = useMemo(() => {
		let filtered = pages

		// Apply status filter
		if (filterStatus !== 'all') {
			filtered = filtered?.filter((page) => page?.status === filterStatus)
		}

		// Apply search filter
		if (searchQuery?.trim()) {
			const query = searchQuery?.toLowerCase()
			filtered = filtered?.filter(
				(page) =>
					page?.title?.toLowerCase()?.includes(query) ||
					(page?.template && page?.template?.toLowerCase()?.includes(query))
			)
		}

		// Apply sorting
		filtered?.sort((a, b) => {
			let aValue = a?.[sortBy as keyof PageType]
			let bValue = b?.[sortBy as keyof PageType]

			if (sortBy === 'lastModified') {
				aValue = new Date(aValue as Date)
				bValue = new Date(bValue as Date)
			}

			if (typeof aValue === 'string') {
				aValue = aValue?.toLowerCase()
				bValue = (bValue as string)?.toLowerCase()
			}

			if (sortOrder === 'asc') {
				return aValue > bValue ? 1 : -1
			} else {
				return aValue < bValue ? 1 : -1
			}
		})

		return filtered
	}, [pages, filterStatus, searchQuery, sortBy, sortOrder])

	// Event handlers
	const handleSort = (column: string) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortBy(column)
			setSortOrder('desc')
		}
	}

	const handleSelectPage = (pageId: string | number, isSelected: boolean) => {
		if (isSelected) {
			setSelectedPages((prev) => [...prev, pageId])
		} else {
			setSelectedPages((prev) => prev?.filter((id) => id !== pageId))
		}
	}

	const handleSelectAll = (isSelected: boolean) => {
		if (isSelected) {
			setSelectedPages(filteredAndSortedPages?.map((page) => page?.id))
		} else {
			setSelectedPages([])
		}
	}

	const handleEdit = (pageId: string | number) => {
		// Store pageId in sessionStorage for Next.js navigation
		sessionStorage.setItem('editPageId', String(pageId))
		router.push('/canvas-editor')
	}

	const handleDuplicate = (pageId: string | number) => {
		const originalPage = pages?.find((p) => p?.id === pageId)
		if (originalPage) {
			const maxId = Math.max(...pages?.map((p) => typeof p?.id === 'number' ? p?.id : 0))
			const newPage: PageType = {
				...originalPage,
				id: maxId + 1,
				title: `${originalPage?.title} (Cópia)`,
				status: 'draft' as const,
				lastModified: new Date(),
				views: 0,
				conversions: 0,
				conversionRate: 0,
			}
			setPages((prev) => [newPage, ...prev])
		}
	}

	const handleDelete = (pageId: string | number) => {
		const page = pages?.find((p) => p?.id === pageId)
		setDeleteModal({
			isOpen: true,
			pageId,
			pageTitle: page?.title || '',
			isMultiple: false,
		})
	}

	const handleBulkDelete = () => {
		setDeleteModal({
			isOpen: true,
			pageId: null,
			pageTitle: '',
			isMultiple: true,
		})
	}

	const confirmDelete = async () => {
		setIsDeleting(true)

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000))

		if (deleteModal?.isMultiple) {
			// Capture selected IDs to avoid stale closure and ensure a defined array
			const idsToDelete = Array.isArray(selectedPages) ? [...selectedPages] : []
			setPages((prev) =>
				prev?.filter((page) => !idsToDelete.includes(page?.id))
			)
			setSelectedPages([])
		} else {
			setPages((prev) =>
				prev?.filter((page) => page?.id !== deleteModal?.pageId)
			)
		}

		setIsDeleting(false)
		setDeleteModal({
			isOpen: false,
			pageId: null,
			pageTitle: '',
			isMultiple: false,
		})
	}

	const handleTogglePublish = (pageId: string | number) => {
		setPages((prev) =>
			prev?.map((page) =>
				page?.id === pageId
					? {
							...page,
							status: (page?.status === 'published'
								? 'draft'
								: 'published') as PageType['status'],
							lastModified: new Date(),
						}
					: page
			)
		)
	}

	const handleBulkPublish = () => {
		setPages((prev) =>
			prev?.map((page) =>
				selectedPages?.includes(page?.id)
					? { ...page, status: 'published', lastModified: new Date() }
					: page
			)
		)
		setSelectedPages([])
	}

	const handleBulkUnpublish = () => {
		setPages((prev) =>
			prev?.map((page) =>
				selectedPages?.includes(page?.id)
					? { ...page, status: 'draft', lastModified: new Date() }
					: page
			)
		)
		setSelectedPages([])
	}

	const handleCreateNew = (type: string) => {
		switch (type) {
			case 'blank':
				router.push('/canvas-editor')
				break
			case 'template':
				router.push('/template-gallery')
				break
			case 'duplicate':
				// Show page selection modal for duplication
				break
			default:
				router.push('/canvas-editor')
		}
	}

	return (
		<div className='min-h-screen bg-surface-secondary-lighter'>
			{/* Stats Overview */}
			<StatsOverview stats={stats} />
			{/* Toolbar */}
			<DashboardToolbar
				viewMode={viewMode}
				onViewModeChange={setViewMode}
				sortBy={sortBy}
				onSortChange={setSortBy}
				filterStatus={filterStatus}
				onFilterStatusChange={setFilterStatus}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				selectedCount={selectedPages?.length}
				onBulkDelete={handleBulkDelete}
				onBulkPublish={handleBulkPublish}
				onBulkUnpublish={handleBulkUnpublish}
				onCreateNew={handleCreateNew}
			/>
			{/* Content Area */}
			<div className='flex-1'>
				{viewMode === 'grid' ? (
					<PageGrid
						pages={filteredAndSortedPages}
						onEdit={handleEdit}
						onDuplicate={handleDuplicate}
						onDelete={handleDelete}
						onTogglePublish={handleTogglePublish}
						selectedPages={selectedPages}
						onSelectPage={handleSelectPage}
					/>
				) : (
					<PageList
						pages={filteredAndSortedPages}
						onEdit={handleEdit}
						onDuplicate={handleDuplicate}
						onDelete={handleDelete}
						onTogglePublish={handleTogglePublish}
						selectedPages={selectedPages}
						onSelectPage={handleSelectPage}
						onSelectAll={handleSelectAll}
						sortBy={sortBy}
						onSort={handleSort}
					/>
				)}
			</div>
			{/* Delete Confirmation Modal */}
			<DeleteConfirmModal
				isOpen={deleteModal?.isOpen}
				onClose={() =>
					setDeleteModal({
						isOpen: false,
						pageId: null,
						pageTitle: '',
						isMultiple: false,
					})
				}
				onConfirm={confirmDelete}
				pageTitle={deleteModal?.pageTitle}
				isMultiple={deleteModal?.isMultiple}
				count={selectedPages?.length}
				isDeleting={isDeleting}
			/>
		</div>
	)
}
