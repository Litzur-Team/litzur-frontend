// Tipos gerais da aplicação

export interface Page {
  id: string | number
  title: string
  thumbnail?: string
  status: 'published' | 'draft' | 'scheduled'
  lastModified: Date
  views: number
  conversions: number
  conversionRate: number
  template?: string
  slug?: string
  name?: string
  publishedAt?: Date
  components?: PageComponent[]
}

export interface PageComponent {
  id: string
  type: string
  name: string
  content: Record<string, any>
  styles: Record<string, any>
  position: number
}

export interface Template {
  id: number
  name: string
  description: string
  category: string
  style: string
  complexity: number
  colorScheme: string
  previewImage: string
  previewImages: {
    desktop: string
    tablet: string
    mobile: string
  }
  usageCount: number
  setupTime: string
  componentCount: number
  isPremium: boolean
  rating: number
  lastUpdated: string
  demoUrl: string
  tags: string[]
  components: TemplateComponent[]
}

export interface TemplateComponent {
  name: string
  description: string
  icon: string
  isCustomizable: boolean
}

export interface Component {
  id: string
  name: string
  description: string
  category: string
  icon: string
  previewImage: string
  tags: string[]
  isResponsive: boolean
  hasAccessibility: boolean
  isPremium: boolean
  code?: string
  props?: ComponentProp[]
}

export interface ComponentProp {
  name: string
  type: string
  required: boolean
  default?: any
  description?: string
}

export interface User {
  name: string
  email: string
  avatar?: string
  role?: string
}

export interface BreadcrumbItem {
  label: string
  path: string
  icon?: string
  isLast?: boolean
}

export type ViewMode = 'desktop' | 'tablet' | 'mobile'
export type SortOrder = 'asc' | 'desc'
