'use client'

import Link from 'next/link'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	children?: React.ReactNode
	isLoading?: boolean
	icon?: IconName
	iconSize?: number
	iconColor?: string
	iconStrokeWidth?: number
	iconPosition?: 'left' | 'right'
	href?: string
}

export default function Button({
	children,
	isLoading,
	icon,
	iconSize,
	iconColor,
	iconStrokeWidth,
	iconPosition = 'right',
	href,
	...props
}: ButtonProps) {
	const baseClass = `bg-primary-default flex w-full items-center justify-center gap-2 rounded-lg p-3 text-sm font-semibold text-white transition duration-200 ease-in-out hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-50 ${props.className || ''}`

	const content = isLoading ? (
		<Loader2 className='animate-spin' size={iconSize ?? 16} />
	) : (
		<>
			{icon && iconPosition === 'left' && (
				<DynamicIcon name={icon} size={iconSize} color={iconColor} strokeWidth={iconStrokeWidth} />
			)}
			{children}
			{icon && iconPosition === 'right' && (
				<DynamicIcon name={icon} size={iconSize} color={iconColor} strokeWidth={iconStrokeWidth} />
			)}
		</>
	)

	if (href) {
		const isDisabled = Boolean(isLoading || props.disabled)
		return (
			<Link
				href={isDisabled ? '#' : href}
				onClick={(e) => {
					if (isDisabled) e.preventDefault()
				}}
				className={baseClass}
				aria-busy={isLoading}
				aria-disabled={isDisabled}
				{...(Object.fromEntries(
					Object.entries(props).filter(([k]) => k.startsWith('aria-') || k.startsWith('data-'))
				) as any)}
			>
				{content}
			</Link>
		)
	}

	return (
		<button
			{...props}
			className={baseClass}
			disabled={isLoading || props.disabled}
			aria-busy={isLoading}
		>
			{content}
		</button>
	)
}
