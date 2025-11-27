// Tipos base para API
export interface ApiResponse<T = any> {
	success: boolean
	data?: T
	message?: string
	error?: string
}

// User types
export interface User {
	id: string
	name: string
	email: string
	telefone?: string
	createdAt?: string
	updatedAt?: string
}

export interface CreateUserDTO {
	name: string
	email: string
	password: string
	telefone?: string
}

export interface UpdateUserDTO {
	name?: string
	email?: string
	password?: string
	telefone?: string
}

export interface LoginDTO {
	email: string
	password: string
}

export interface LoginResponse {
	token: string
	user: User
}

// Page types
export interface Page {
	id: string
	title: string
	slug: string
	content?: any
	isPublished: boolean
	userId: string
	createdAt: string
	updatedAt: string
}

export interface CreatePageDTO {
	title: string
	slug?: string
	content?: any
}

export interface UpdatePageDTO {
	title?: string
	slug?: string
	content?: any
	isPublished?: boolean
}

// Error types
export interface ApiError {
	message: string
	status?: number
	errors?: Record<string, string[]>
}
