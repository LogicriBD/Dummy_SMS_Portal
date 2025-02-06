'use client'

import classNames from 'classnames'
import { HTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type SidenavItemProps = {
  name: string
  active?: boolean
  expanded: boolean
  icon: ReactNode
} & HTMLAttributes<HTMLDivElement>

export default function SidenavItem(props: SidenavItemProps) {
  return (
    <div
      className={twMerge(
        'flex cursor-pointer flex-row items-center gap-x-4 rounded-full text-xs transition-all duration-300',
        classNames(
          props.expanded ? 'h-auto w-full justify-start py-3.5 pl-4' : 'mx-auto h-12 w-12 justify-center p-0',
          props.active
            ? 'bg-primary bg-opacity-4 font-semibold text-primary '
            : 'font-normal text-secondary hover:bg-secondary/3'
        ),
        props.className
      )}
    >
      <span>{props.icon}</span>
      {props.expanded && <span className="font-medium">{props.name}</span>}
    </div>
  )
}
