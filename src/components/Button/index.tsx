'use client'

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
}

export default function Button({
	children,
	isLoading,
	icon,
	iconSize,
	iconColor,
	iconStrokeWidth,
	iconPosition = 'right',
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			className={`bg-primary-default flex w-full items-center justify-center gap-2 rounded-lg p-3 text-sm font-semibold text-white transition duration-200 ease-in-out hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-50 ${props.className || ''}`}
			disabled={isLoading || props.disabled}
			aria-busy={isLoading}
		>
			{isLoading ? (
				<Loader2 className='animate-spin' size={iconSize ?? 16} />
			) : (
				<>
					{icon && iconPosition === 'left' && (
						<DynamicIcon
							name={icon}
							size={iconSize}
							color={iconColor}
							strokeWidth={iconStrokeWidth}
						/>
					)}
					{children}
					{icon && iconPosition === 'right' && (
						<DynamicIcon
							name={icon}
							size={iconSize}
							color={iconColor}
							strokeWidth={iconStrokeWidth}
						/>
					)}
				</>
			)}
		</button>
	)
}
