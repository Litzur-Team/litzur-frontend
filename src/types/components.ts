// Props de componentes UI comuns
import { ButtonHTMLAttributes, InputHTMLAttributes, SelectHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'primary' | 'secondary'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  iconName?: string
  iconPosition?: 'left' | 'right'
  iconSize?: number
  loading?: boolean
  asChild?: boolean
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  description?: string
  required?: boolean
  id?: string
}

export interface SelectOption {
  value: string
  label: string
  icon?: string
  description?: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  multiple?: boolean
  searchable?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  defaultValue?: string | string[]
  name?: string
  id?: string
  required?: boolean
  description?: string
  clearable?: boolean
  loading?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  description?: string
  error?: string
  indeterminate?: boolean
  className?: string
  id?: string
  required?: boolean
  size?: 'sm' | 'default' | 'lg'
}

export interface IconProps {
  name: string
  size?: number
  color?: string
  className?: string
  strokeWidth?: number
}

export interface ImageProps {
  src: string
  alt?: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}
