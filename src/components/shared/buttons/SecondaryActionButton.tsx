import React, { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

interface SecondaryActionButtonProps extends HTMLAttributes<HTMLButtonElement>
{
  label: string
  type?: 'button' | 'submit' | 'reset'
  iconLeft?: ReactNode
  iconRight?: ReactNode
  isLoading?: boolean
  isDisabled?: boolean
}

export default function SecondaryActionButton(props: SecondaryActionButtonProps)
{
  const isLoading = props.isLoading ?? false

  return (
    <button
      type={props.type ?? 'button'}
      onClick={props?.onClick}
      disabled={props.isDisabled ?? false}
      className={twMerge(
        'flex w-auto shrink-0 items-center justify-center rounded-full bg-light/10 px-6 py-3 text-xs font-medium text-primary shadow-none transition-all duration-300 hover:bg-light/20 disabled:bg-gray-200 disabled:text-gray-700',
        props.className
      )}
    >
      {isLoading && <FaSpinner className="animate-spin" />}
      {!isLoading && (
        <div className="flex items-center justify-center gap-x-2">
          {!!props.iconLeft && props.iconLeft}
          <span>{props.label}</span>
          {!!props.iconRight && props.iconRight}
        </div>
      )}
    </button>
  )
}
