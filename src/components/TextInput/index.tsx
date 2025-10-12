interface TextInputProps extends React.ComponentPropsWithoutRef<'input'> {
	label?: string
	error?: string
}

export default function TextInput({ label, error, ...props }: TextInputProps) {
	return (
		<div className='flex flex-col gap-1'>
			{label && (
				<label
					htmlFor={props.name ?? props.id}
					className='text-secondary-default text-sm font-semibold'
				>
					{label}
				</label>
			)}
			<input
				{...props}
				className={`rounded-lg border px-2 py-3 text-xs hover:brightness-90 focus:brightness-90 ${
					error ? 'border-danger-default' : 'border-surface-secondary-light'
				} ${props.className ?? ''}`}
			/>
			{error && <span className='text-danger-default text-xs'>{error}</span>}
		</div>
	)
}
