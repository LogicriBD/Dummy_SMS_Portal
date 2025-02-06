import { HTMLAttributes, ReactNode } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

interface PrimaryActionButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
  className?: string
  isLoading?: boolean
}

export default function NormalButton(props: PrimaryActionButtonProps) {
  const { isLoading } = props

  return (
    <div
      className={twMerge(
        'w-full bg-white text-black hover:bg-white/56 flex justify-center py-3 px-6 rounded-full items-center',
        props.className
      )}
    >
      {isLoading && <FaSpinner className="animate-spin" />}
      {!isLoading && (
        <>
          {!!props.iconLeft && props.iconLeft}
          <p className="text-xs ml-2">{props.label}</p>
          {!!props.iconRight && props.iconRight}
        </>
      )}
    </div>
  )
}
