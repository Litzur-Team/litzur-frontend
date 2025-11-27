import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const api: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

// Request interceptor - adiciona token de autenticação
api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const token = localStorage.getItem('authToken')
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

// Response interceptor - trata erros globalmente
api.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			// Token expirado ou inválido
			localStorage.removeItem('authToken')
			if (typeof window !== 'undefined') {
				window.location.href = '/signin'
			}
		}
		return Promise.reject(error)
	}
)

export default api
