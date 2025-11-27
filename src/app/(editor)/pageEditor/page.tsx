'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '../../../components/AppIcon'
import Button from '../../../components/ui/Button'
import ComponentLibrary from './components/ComponentLibrary'
import CanvasArea from './components/CanvasArea'
import PropertiesPanel from './components/PropertiesPanel'
import ComponentOutline from './components/ComponentOutline'
import EditorToolbar from './components/EditorToolbar'

interface PageComponent {
	id: string
	type: string
	name: string
	content: any
	styles: any
	position: number
}

interface UndoAction {
	action: 'add' | 'delete' | 'update' | 'reorder'
	component?: PageComponent
	from?: number
	to?: number
}

type ViewMode = 'desktop' | 'tablet' | 'mobile'

const PageEditor = () => {
	const router = useRouter()
	const [selectedComponent, setSelectedComponent] =
		useState<PageComponent | null>(null)
	const [viewMode, setViewMode] = useState<ViewMode>('desktop')
	const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(false)
	const [isPropertiesCollapsed, setIsPropertiesCollapsed] = useState(false)
	const [isOutlineVisible, setIsOutlineVisible] = useState(false)
	const [undoStack, setUndoStack] = useState<UndoAction[]>([])
	const [redoStack, setRedoStack] = useState<UndoAction[]>([])
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [isPublishing, setIsPublishing] = useState(false)
	const [pageComponents, setPageComponents] = useState<PageComponent[]>([])
	const [isScreenTooSmall, setIsScreenTooSmall] = useState(false)

	// Check screen size
	useEffect(() => {
		const checkScreenSize = () => {
			setIsScreenTooSmall(window.innerWidth < 1024)
		}

		checkScreenSize()
		window.addEventListener('resize', checkScreenSize)

		return () => window.removeEventListener('resize', checkScreenSize)
	}, [])
	const [pageData, setPageData] = useState<{
		id: string
		name: string
		slug: string
		status: string
		lastModified: Date
		components: PageComponent[]
	}>({
		id: 'page-001',
		name: 'Landing Page Principal',
		slug: 'landing-principal',
		status: 'draft',
		lastModified: new Date(),
		components: [],
	})

	// Handle component selection
	const handleComponentSelect = useCallback((component: PageComponent) => {
		setSelectedComponent(component)
	}, [])

	// Handle component drop from library
	const handleComponentDrop = useCallback(
		(component: any, dropIndex: number | null = null) => {
			const newComponent = {
				id: `comp-${Date.now()}`,
				type: component?.id || component?.type,
				name: component?.name,
				content: getDefaultContent(component?.id || component?.type),
				styles: getDefaultStyles(component?.id || component?.type),
				position: dropIndex !== null ? dropIndex : pageComponents?.length,
			}

			const newComponents = [...pageComponents]
			if (dropIndex !== null) {
				newComponents?.splice(dropIndex, 0, newComponent)
			} else {
				newComponents?.push(newComponent)
			}

			setPageComponents(newComponents)
			setSelectedComponent(newComponent)
			setHasUnsavedChanges(true)

			// Add to undo stack
			setUndoStack((prev) => [
				...prev,
				{ action: 'add', component: newComponent },
			])
			setRedoStack([])
		},
		[pageComponents]
	)

	// Handle component update
	const handleComponentUpdate = useCallback(
		(updatedComponent: PageComponent) => {
			const newComponents = pageComponents?.map((comp) =>
				comp?.id === updatedComponent?.id ? updatedComponent : comp
			)
			setPageComponents(newComponents)
			setSelectedComponent(updatedComponent)
			setHasUnsavedChanges(true)

			// Add to undo stack
			setUndoStack((prev) => [
				...prev,
				{ action: 'update', component: updatedComponent },
			])
			setRedoStack([])
		},
		[pageComponents]
	)

	// Handle component deletion
	const handleComponentDelete = useCallback(
		(componentId: string) => {
			const componentToDelete = pageComponents?.find(
				(c) => c?.id === componentId
			)
			if (!componentToDelete) return

			const newComponents = pageComponents?.filter((c) => c?.id !== componentId)
			setPageComponents(newComponents)

			// Clear selection if deleted component was selected
			if (selectedComponent?.id === componentId) {
				setSelectedComponent(null)
			}

			setHasUnsavedChanges(true)

			// Add to undo stack
			setUndoStack((prev) => [
				...prev,
				{ action: 'delete', component: componentToDelete },
			])
			setRedoStack([])
		},
		[pageComponents, selectedComponent]
	)

	// Handle component reorder
	const handleComponentReorder = useCallback(
		(draggedId: string, targetId: string) => {
			const draggedIndex = pageComponents?.findIndex((c) => c?.id === draggedId)
			const targetIndex = pageComponents?.findIndex((c) => c?.id === targetId)

			if (draggedIndex === -1 || targetIndex === -1) return

			const newComponents = [...pageComponents]
			const [draggedComponent] = newComponents?.splice(draggedIndex, 1)
			newComponents?.splice(targetIndex, 0, draggedComponent)

			setPageComponents(newComponents)
			setHasUnsavedChanges(true)

			// Add to undo stack
			setUndoStack((prev) => [
				...prev,
				{ action: 'reorder', from: draggedIndex, to: targetIndex },
			])
			setRedoStack([])
		},
		[pageComponents]
	)

	// Get default content for component types
	const getDefaultContent = useCallback((type: string): any => {
		const defaults: Record<string, any> = {
			heading: { text: 'Novo Título', level: 'h2' },
			text: { content: 'Adicione seu texto aqui...' },
			button: { text: 'Clique Aqui', href: '#', variant: 'primary' },
			image: {
				src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
				alt: 'Imagem',
				caption: '',
			},
			section: { title: 'Nova Seção', content: '' },
			container: { content: 'Container vazio' },
			hero: {
				title: 'Título Principal',
				subtitle: 'Subtítulo descritivo',
				buttonText: 'Call to Action',
				backgroundImage:
					'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop',
			},
			features: {
				title: 'Nossos Recursos',
				features: [
					{
						icon: 'Star',
						title: 'Recurso 1',
						description: 'Descrição do recurso',
					},
					{
						icon: 'Heart',
						title: 'Recurso 2',
						description: 'Descrição do recurso',
					},
					{
						icon: 'Shield',
						title: 'Recurso 3',
						description: 'Descrição do recurso',
					},
				],
			},
			slider: {
				slides: [
					{
						image:
							'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
						title: 'Slide 1',
					},
					{
						image:
							'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
						title: 'Slide 2',
					},
				],
			},
			form: {
				title: 'Formulário de Contato',
				fields: [
					{ type: 'text', label: 'Nome', required: true },
					{ type: 'email', label: 'Email', required: true },
					{ type: 'textarea', label: 'Mensagem', required: false },
				],
				submitText: 'Enviar',
			},
			tabs: {
				tabs: [
					{ id: 'tab1', title: 'Aba 1', content: 'Conteúdo da primeira aba' },
					{ id: 'tab2', title: 'Aba 2', content: 'Conteúdo da segunda aba' },
				],
			},
			accordion: {
				items: [
					{ title: 'Item 1', content: 'Conteúdo do primeiro item' },
					{ title: 'Item 2', content: 'Conteúdo do segundo item' },
				],
			},
			modal: {
				title: 'Título do Modal',
				content: 'Conteúdo do modal...',
				buttonText: 'Abrir Modal',
			},
			card: {
				title: 'Título do Card',
				content: 'Conteúdo do card...',
				image:
					'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=200&fit=crop',
			},
			testimonial: {
				quote: 'Esta é uma citação de depoimento incrível!',
				author: 'Nome do Cliente',
				company: 'Empresa do Cliente',
				avatar:
					'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
			},
			pricing: {
				title: 'Planos e Preços',
				plans: [
					{
						name: 'Básico',
						price: 'R$ 29',
						features: ['Feature 1', 'Feature 2'],
					},
					{
						name: 'Pro',
						price: 'R$ 79',
						features: ['Feature 1', 'Feature 2', 'Feature 3'],
					},
				],
			},
			cta: {
				title: 'Pronto para começar?',
				subtitle: 'Entre em contato conosco hoje mesmo',
				buttonText: 'Começar Agora',
			},
			newsletter: {
				title: 'Inscreva-se na Newsletter',
				subtitle: 'Receba as últimas novidades',
				placeholder: 'Seu email...',
				buttonText: 'Inscrever',
			},
		}
		return defaults?.[type] || { content: 'Novo componente' }
	}, [])

	// Get default styles for component types
	const getDefaultStyles = useCallback((type: string): any => {
		const defaults: Record<string, any> = {
			section: {
				padding: 'py-16',
				background: 'bg-white',
				textColor: 'text-foreground',
			},
			container: {
				padding: 'py-8',
				background: 'bg-gray-50',
				textColor: 'text-foreground',
			},
			heading: {
				padding: 'py-4',
				background: 'bg-transparent',
				textColor: 'text-foreground',
				fontSize: 'text-3xl',
				fontWeight: 'font-bold',
			},
			text: {
				padding: 'py-2',
				background: 'bg-transparent',
				textColor: 'text-foreground',
			},
			button: {
				padding: 'px-6 py-3',
				background: 'bg-primary',
				textColor: 'text-white',
				borderRadius: 'rounded-lg',
			},
			image: { padding: 'py-4', background: 'bg-transparent' },
			hero: {
				padding: 'py-20',
				background: 'bg-primary',
				textColor: 'text-white',
			},
			features: {
				padding: 'py-16',
				background: 'bg-gray-50',
				textColor: 'text-foreground',
			},
			slider: {
				padding: 'py-8',
				background: 'bg-white',
				textColor: 'text-foreground',
			},
			form: {
				padding: 'py-16',
				background: 'bg-white',
				textColor: 'text-foreground',
			},
			tabs: {
				padding: 'py-8',
				background: 'bg-white',
				textColor: 'text-foreground',
			},
			accordion: {
				padding: 'py-8',
				background: 'bg-white',
				textColor: 'text-foreground',
			},
			modal: {
				padding: 'py-8',
				background: 'bg-white',
				textColor: 'text-foreground',
			},
			card: {
				padding: 'py-6',
				background: 'bg-white',
				textColor: 'text-foreground',
				border: 'border border-border',
				borderRadius: 'rounded-lg',
			},
			testimonial: {
				padding: 'py-16',
				background: 'bg-gray-50',
				textColor: 'text-foreground',
			},
			pricing: {
				padding: 'py-16',
				background: 'bg-white',
				textColor: 'text-foreground',
			},
			cta: {
				padding: 'py-20',
				background: 'bg-gradient-to-r from-primary to-secondary',
				textColor: 'text-white',
			},
			newsletter: {
				padding: 'py-16',
				background: 'bg-primary',
				textColor: 'text-white',
			},
		}
		return (
			defaults?.[type] || {
				padding: 'py-8',
				background: 'bg-white',
				textColor: 'text-foreground',
			}
		)
	}, [])

	// Undo functionality
	const handleUndo = useCallback(() => {
		if (undoStack?.length === 0) return

		const lastAction = undoStack?.[undoStack?.length - 1]
		setRedoStack((prev) => [...prev, lastAction])
		setUndoStack((prev) => prev?.slice(0, -1))

		// Apply undo logic based on action type
		switch (lastAction?.action) {
			case 'add':
				setPageComponents((prev) =>
					prev?.filter((c) => c?.id !== lastAction?.component?.id)
				)
				if (selectedComponent?.id === lastAction?.component?.id) {
					setSelectedComponent(null)
				}
				break
			case 'delete':
				setPageComponents((prev) => {
					if (lastAction?.component) {
						return [...prev, lastAction.component]
					}
					return prev
				})
				break
			case 'update':
				// Would need to store previous state for proper undo
				break
			case 'reorder':
				// Reverse the reorder
				if (
					typeof lastAction?.to === 'number' &&
					typeof lastAction?.from === 'number'
				) {
					const newComponents = [...pageComponents]
					const [component] = newComponents?.splice(lastAction.to, 1)
					newComponents?.splice(lastAction.from, 0, component)
					setPageComponents(newComponents)
				}
				break
		}

		setHasUnsavedChanges(true)
	}, [undoStack, pageComponents, selectedComponent])

	// Redo functionality
	const handleRedo = useCallback(() => {
		if (redoStack?.length === 0) return

		const actionToRedo = redoStack?.[redoStack?.length - 1]
		setUndoStack((prev) => [...prev, actionToRedo])
		setRedoStack((prev) => prev?.slice(0, -1))

		// Apply redo logic
		switch (actionToRedo?.action) {
			case 'add':
				if (actionToRedo?.component) {
					setPageComponents((prev) => [...prev, actionToRedo.component!])
				}
				break
			case 'delete':
				setPageComponents((prev) =>
					prev?.filter((c) => c?.id !== actionToRedo?.component?.id)
				)
				if (selectedComponent?.id === actionToRedo?.component?.id) {
					setSelectedComponent(null)
				}
				break
			case 'reorder':
				if (
					typeof actionToRedo?.from === 'number' &&
					typeof actionToRedo?.to === 'number'
				) {
					const newComponents = [...pageComponents]
					const [component] = newComponents?.splice(actionToRedo.from, 1)
					newComponents?.splice(actionToRedo.to, 0, component)
					setPageComponents(newComponents)
				}
				break
		}

		setHasUnsavedChanges(true)
	}, [redoStack, pageComponents, selectedComponent])

	// Save page
	const handleSave = useCallback(async () => {
		setIsSaving(true)

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500))

			const updatedPageData = {
				...pageData,
				components: pageComponents,
				lastModified: new Date(),
			}

			setPageData(updatedPageData)
			setHasUnsavedChanges(false)

			// Show success notification
			console.log('Página salva com sucesso!')
		} catch (error) {
			console.error('Erro ao salvar página:', error)
		} finally {
			setIsSaving(false)
		}
	}, [pageData, pageComponents])

	// Preview page
	const handlePreview = useCallback(() => {
		// Open preview in new tab
		const previewData = {
			...pageData,
			components: pageComponents,
		}

		// Store preview data in sessionStorage
		sessionStorage.setItem('previewData', JSON.stringify(previewData))
		window.open('/preview', '_blank')
	}, [pageData, pageComponents])

	// Publish page
	const handlePublish = useCallback(async () => {
		setIsPublishing(true)

		try {
			// Save first if there are unsaved changes
			if (hasUnsavedChanges) {
				await handleSave()
			}

			// Simulate publish API call
			await new Promise((resolve) => setTimeout(resolve, 2000))

			const publishedPageData = {
				...pageData,
				status: 'published',
				publishedAt: new Date(),
			}

			setPageData(publishedPageData)

			// Show success notification
			console.log('Página publicada com sucesso!')
		} catch (error) {
			console.error('Erro ao publicar página:', error)
		} finally {
			setIsPublishing(false)
		}
	}, [pageData, hasUnsavedChanges, handleSave])

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				(e?.target as HTMLElement)?.tagName === 'INPUT' ||
				(e?.target as HTMLElement)?.tagName === 'TEXTAREA'
			)
				return

			if (e?.key === 'Delete' && selectedComponent) {
				handleComponentDelete(selectedComponent?.id)
			}

			// Ctrl/Cmd + Z for undo
			if ((e?.ctrlKey || e?.metaKey) && e?.key === 'z' && !e?.shiftKey) {
				e?.preventDefault()
				handleUndo()
			}

			// Ctrl/Cmd + Shift + Z for redo
			if ((e?.ctrlKey || e?.metaKey) && e?.key === 'z' && e?.shiftKey) {
				e?.preventDefault()
				handleRedo()
			}

			// Ctrl/Cmd + S for save
			if ((e?.ctrlKey || e?.metaKey) && e?.key === 's') {
				e?.preventDefault()
				handleSave()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [
		selectedComponent,
		handleComponentDelete,
		handleUndo,
		handleRedo,
		handleSave,
	])

	// Auto-save functionality
	useEffect(() => {
		if (!hasUnsavedChanges) return

		const autoSaveTimer = setTimeout(() => {
			handleSave()
		}, 30000) // Auto-save after 30 seconds of inactivity

		return () => clearTimeout(autoSaveTimer)
	}, [hasUnsavedChanges, handleSave])

	// Show screen size warning for small screens
	if (isScreenTooSmall) {
		return (
			<div className='flex h-screen items-center justify-center bg-background-light p-6'>
				<div className='max-w-md text-center'>
					<div className='bg-warning-lighter mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full'>
						<Icon name='Monitor' size={48} className='text-warning-darker' />
					</div>
					<h1 className='text-secondary-darker mb-4 text-2xl font-bold'>
						Tela muito pequena
					</h1>
					<p className='text-secondary-default mb-6 text-base'>
						O editor de páginas requer uma tela com largura mínima de
						(1024px) para funcionar corretamente.
					</p>
					<p className='text-secondary-default mb-8 text-sm'>
						Por favor, acesse em um dispositivo com tela maior ou aumente o
						tamanho da janela do navegador.
					</p>
					<Button
						variant='default'
						size='default'
						onClick={() => router.push('/dashboard')}
						iconName='ArrowLeft'
						iconPosition='left'
						className='bg-primary-default hover:bg-primary-dark text-white'
					>
						Voltar ao Dashboard
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className='bg-surface-secondary-lighter flex h-screen flex-col overflow-hidden'>
			{/* Header */}
			<header className='bg-background-light border-surface-secondary-default flex items-center justify-between border-b px-6 py-4 shadow-sm'>
				<div className='flex items-center space-x-4'>
					<Button
						variant='ghost'
						size='sm'
						onClick={() => router.push('/dashboard')}
						iconName='ArrowLeft'
						iconSize={16}
						title='Voltar ao dashboard'
					/>
					<div className='flex items-center space-x-3'>
						<div className='bg-primary-default flex h-8 w-8 items-center justify-center rounded-lg'>
							<Icon name='PaintBucket' size={18} color='white' />
						</div>
						<div>
							<h1 className='text-secondary-darker text-lg font-semibold'>
								{pageData?.name}
							</h1>
							<div className='text-secondary-default flex items-center space-x-2 text-sm'>
								<span>/{pageData?.slug}</span>
								<div className='bg-secondary-default h-1 w-1 rounded-full' />
								<span
									className={`rounded-full px-2 py-0.5 text-xs font-medium ${pageData?.status === 'published' ? 'bg-success-lighter text-success-darker' : 'bg-warning-lighter text-warning-darker'} `}
								>
									{pageData?.status === 'published' ? 'Publicado' : 'Rascunho'}
								</span>
								{hasUnsavedChanges && (
									<>
										<div className='bg-secondary-default h-1 w-1 rounded-full' />
										<span className='text-warning-default'>
											Alterações não salvas
										</span>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={handlePreview}
						iconName='Eye'
						iconPosition='left'
						iconSize={16}
						className='hover:text-primary-default hover:transform'
					>
						Pré-visualizar
					</Button>
					<Button
						variant='default'
						size='sm'
						onClick={handleSave}
						loading={isSaving}
						iconName='Save'
						iconPosition='left'
						iconSize={16}
						className='bg-primary-default hover:bg-primary-dark text-white'
					>
						{isSaving ? 'Salvando...' : 'Salvar'}
					</Button>
					<Button
						variant='success'
						size='sm'
						onClick={handlePublish}
						loading={isPublishing}
						iconName='Upload'
						iconPosition='left'
						iconSize={16}
						className='bg-success-default hover:bg-success-dark text-white'
					>
						{isPublishing ? 'Publicando...' : 'Publicar'}
					</Button>
				</div>
			</header>
			{/* Main Content */}
			<div className='flex flex-1 overflow-hidden'>
				{/* Component Library */}
				<ComponentLibrary
					isCollapsed={isLibraryCollapsed}
					onToggle={() => setIsLibraryCollapsed(!isLibraryCollapsed)}
					onDragStart={(component: any) => {
						console.log('Drag started:', component)
					}}
				/>

				{/* Canvas Area */}
				<CanvasArea
					components={pageComponents}
					selectedComponent={selectedComponent}
					onComponentSelect={handleComponentSelect}
					onComponentDrop={(component: any, index: number) =>
						handleComponentDrop(component, index)
					}
					onComponentDelete={handleComponentDelete}
					onComponentUpdate={(id: string, updates: any) => {
						const componentToUpdate = pageComponents.find((c) => c.id === id)
						if (componentToUpdate) {
							handleComponentUpdate({ ...componentToUpdate, ...updates })
						}
					}}
					viewMode={viewMode}
					onViewModeChange={setViewMode}
				/>

				{/* Properties Panel */}
				<PropertiesPanel
					selectedComponent={selectedComponent}
					onComponentUpdate={(id: string, updates: any) => {
						const componentToUpdate = pageComponents.find((c) => c.id === id)
						if (componentToUpdate) {
							handleComponentUpdate({ ...componentToUpdate, ...updates })
						}
					}}
					onComponentDelete={handleComponentDelete}
					isCollapsed={isPropertiesCollapsed}
					onToggle={() => setIsPropertiesCollapsed(!isPropertiesCollapsed)}
				/>
			</div>
			{/* Component Outline */}
			<ComponentOutline
				components={pageComponents}
				selectedComponent={selectedComponent}
				onComponentSelect={handleComponentSelect}
				onComponentReorder={(startIndex: number, endIndex: number) => {
					if (
						startIndex < 0 ||
						endIndex < 0 ||
						startIndex >= pageComponents.length ||
						endIndex >= pageComponents.length
					)
						return

					const newComponents = [...pageComponents]
					const [movedComponent] = newComponents.splice(startIndex, 1)
					newComponents.splice(endIndex, 0, movedComponent)

					setPageComponents(newComponents)
					setHasUnsavedChanges(true)
					setUndoStack((prev) => [
						...prev,
						{ action: 'reorder', from: startIndex, to: endIndex },
					])
					setRedoStack([])
				}}
				onComponentDelete={handleComponentDelete}
				isVisible={isOutlineVisible}
				onToggle={() => setIsOutlineVisible(!isOutlineVisible)}
			/>
			{/* Editor Toolbar */}
			<EditorToolbar
				onUndo={handleUndo}
				onRedo={handleRedo}
				onSave={handleSave}
				onPreview={handlePreview}
				onPublish={handlePublish}
				canUndo={undoStack?.length > 0}
				canRedo={redoStack?.length > 0}
				isSaving={isSaving}
				isPublishing={isPublishing}
				hasUnsavedChanges={hasUnsavedChanges}
			/>
		</div>
	)
}

export default PageEditor
