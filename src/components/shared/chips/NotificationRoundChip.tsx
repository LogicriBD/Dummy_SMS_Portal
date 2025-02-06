import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type CloseableRoundChipProps = {
  label: string
  notificationIcon?: ReactNode
} & HTMLAttributes<HTMLDivElement>

export default function NotificationRoundChip(props: CloseableRoundChipProps) {
  return (
    <div
      className={twMerge(
        'rounded-full bg-secondary text-white text-xs w-9 h-9 flex justify-center items-center relative',
        props.className
      )}
    >
      <span>{props.label}</span>
      {props.notificationIcon && <div className="absolute -top-2 -right-1 w-min">{props.notificationIcon}</div>}
    </div>
  )
}
