import { HTMLAttributes, ReactNode } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  label?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  isLoading?: boolean
  isDisabled?: boolean
} & HTMLAttributes<HTMLButtonElement>

export default function PrimaryActionButton(props: ButtonProps)
{
  if (!props.label && !props.iconLeft && !props.iconRight)
  {
    throw new Error('Button must have at least one of the following: label, iconLeft, iconRight')
  }

  return (
    <button
      type={props.type ?? 'button'}
      data-test={`primary-button-${props.label}`.split(' ').join('')}
      disabled={props.isDisabled ?? false}
      onClick={props?.onClick}
      className={twMerge(
        'bg-primary hover:bg-primary/90 relative flex h-10 w-auto shrink-0 items-center justify-center rounded-full px-6 text-xs font-medium text-white shadow-lg shadow-primary/40 hover:shadow--primary/50 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-gray-600',
        props.className
      )}
    >
      {!!props.isLoading && <FaSpinner className="animate-spin" />}
      {!props.isLoading && (
        <div className="flex items-center justify-center gap-x-2">
          {!!props.iconLeft && props.iconLeft}
          {!!props.label && <span>{props.label}</span>}
          {!!props.iconRight && props.iconRight}
        </div>
      )}
    </button>
  )
}
