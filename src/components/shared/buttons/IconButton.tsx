import classNames from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

type IconButtonProps = { icon: ReactNode, isLoading?: boolean, disabled?: boolean } & HTMLAttributes<HTMLButtonElement>

export default function IconButton(props: IconButtonProps)
{
  return (
    <button
      onClick={props.onClick}
      className={twMerge(
        'flex justify-center items-center rounded-full bg-stone-200 hover:bg-slate-100 cursor-pointer h-8 w-8 p-2',
        props.className, classNames({
          'cursor-not-allowed': props.disabled
        })
      )}
      disabled={props.disabled}
      {...props}
    >
      {props.isLoading && <FaSpinner className="animate-spin" />}
      {!props.isLoading && props.icon}
    </button>
  )
}
