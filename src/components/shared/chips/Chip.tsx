import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ChipProps = {
  label: string
} & HTMLAttributes<HTMLDivElement>

export default function Chip(props: ChipProps) {
  return (
    <div
      className={twMerge(
        'rounded-full bg-emerald-800 text-white text-xs flex justify-center items-center relative px-3 py-1',
        props.className
      )}
    >
      <span>{props.label}</span>
    </div>
  )
}
