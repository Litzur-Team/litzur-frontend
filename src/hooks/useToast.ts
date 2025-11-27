import toast from 'react-hot-toast'

export function useToast() {
	const success = (message: string) => {
		toast.success(message)
	}

	const error = (message: string) => {
		toast.error(message)
	}

	const loading = (message: string) => {
		return toast.loading(message)
	}

	const dismiss = (toastId: string) => {
		toast.dismiss(toastId)
	}

	const promise = async <T,>(
		promise: Promise<T>,
		messages: {
			loading: string
			success: string
			error: string
		}
	) => {
		return toast.promise(promise, messages)
	}

	const custom = (message: string, options?: any) => {
		toast(message, options)
	}

	return {
		success,
		error,
		loading,
		dismiss,
		promise,
		custom,
	}
}
